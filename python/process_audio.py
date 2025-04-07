import os
import re
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import librosa
import logging
from pyannote.audio import Model
from pyannote.audio.pipelines import VoiceActivityDetection, OverlappedSpeechDetection
import soundfile as sf
from concurrent.futures import ThreadPoolExecutor
import noisereduce as nr
from transformers import AutoProcessor, AutoModelForSpeechSeq2Seq
import torch
from deep_translator import GoogleTranslator
import sys
import json
import traceback

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class TranscriptionProcessor:
    def __init__(self):
        # Academic roles and titles
        self.academic_roles = {
            'Dean', 'Faculty', 'Professor', 'Instructor', 'Program Head', 'Program Coordinator',
            'Custodian', 'Secretary', 'Research Implementing Unit Head'
        }

        # Academic terms and abbreviations
        self.academic_terms = {
            'IPCR', 'OJT', 'Midterm', 'Final Exam', 'Rubrics', 'DTR',
            'Accreditation', 'LPT', 'DIT', 'MIT', 'CCS'
        }

        # Departments and programs
        self.departments = {
            'CCS', 'Computer Science', 'IT', 'Information Technology'
        }

        # Known faculty and staff names
        self.known_names = {
            'Dean Mia V. Villarica', 'Maria Laureen Miranda', 'Edward Flores',
            'John Randolf Penaredondo', 'Reynalen C. Justo', 'Mark P. Bernardino',
            'Harlene Gabrille Origines', 'Rachiel R. Rivano', 'Reymart Joseph Pielago',
            'Romel P. Serrano', 'Gener Mosico'
        }

        # Common Filipino word corrections
        self.filipino_corrections = {
            r'\bdi\s+tanong\b': 'di ba',
            r'\bstudyante\b': 'estudyante',
            r'\bwla\b': 'wala',
            r'\bsna\b': 'sana',
            r'\bpra\b': 'para',
            r'\bung\b': 'yung',
            r'\bkht\b': 'kahit',
            r'\bmga\s+tao\b': 'mga tao',
            r'\bpag\s+may\b': 'pag may',
            r'\bsa\s+mga\b': 'sa mga'
        }

        # Time and number formats
        self.time_formats = {
            r'\b(\d{1,2})\s*a\s*m\b': r'\1:00 AM',
            r'\b(\d{1,2})(\d{2})\s*am\b': r'\1:\2 AM',
            r'\b(\d{1,2})\s*p\s*m\b': r'\1:00 PM',
            r'\b(\d{1,2})(\d{2})\s*pm\b': r'\1:\2 PM'
        }

    def create_term_patterns(self):
        patterns = {}
        all_terms = set()

        # Combine all terms while maintaining their proper capitalization
        all_terms.update(self.academic_roles)
        all_terms.update(self.academic_terms)
        all_terms.update(self.departments)
        all_terms.update(self.known_names)

        for term in all_terms:
            # Create pattern for full term
            pattern = rf'\b{term.lower()}\b'
            patterns[pattern] = term

            # For multi-word terms, also create patterns for significant parts
            if ' ' in term:
                parts = term.split()
                for part in parts:
                    if len(part) > 1 and not part.lower() in ['v.', 'p.', 'c.', 'r.']:  # Skip initials
                        pattern = rf'\b{part.lower()}\b'
                        patterns[pattern] = part

        return patterns

class TranscriptTranslator:
    def __init__(self):
        self.translator = GoogleTranslator(source='tl', target='en')

        # Academic and meeting-specific terms to preserve
        self.academic_terms = {
            # Academic roles and titles
            'Dean', 'Faculty', 'Professor', 'Instructor', 'Program Head', 'Program Coordinator',
            'Custodian', 'Secretary', 'Research Implementing Unit Head',
            # Academic terms
            'IPCR', 'OJT', 'Midterm', 'Final Exam', 'Rubrics', 'DTR',
            'Accreditation', 'LPT', 'DIT', 'MIT', 'CCS',
            # Departments/Programs
            'CCS', 'Computer Science', 'IT', 'Information Technology',
            # Names (from transcript)
            'Dean Mia V. Villarica', 'Maria Laureen Miranda', 'Edward Flores',
            'John Randolf Penaredondo', 'Reynalen C. Justo', 'Mark P. Bernardino',
            'Harlene Gabrille Origines', 'Rachiel R. Rivano', 'Reymart Joseph Pielago',
            'Romel P. Serrano', 'Gener Mosico', 'Edward Flores'
        }

    def translate_text(self, text: str) -> str:
        """Translate text while preserving terms"""
        try:
            # Split text into chunks to handle long texts
            chunks = text.split('.')
            chunks = [chunk.strip() for chunk in chunks if chunk.strip()]

            translated_chunks = []
            for chunk in chunks:
                # Instead of using placeholders, directly preserve the terms
                preserved_terms = []
                for term in self.academic_terms:
                    if term.lower() in chunk.lower():
                        preserved_terms.append(term)

                # Translate the chunk
                translated_chunk = self.translator.translate(chunk)

                # Restore preserved terms by finding their approximate position
                for term in preserved_terms:
                    translated_lower = translated_chunk.lower()
                    if term.lower() not in translated_lower:
                        # If term is completely missing, append it
                        translated_chunk += f" {term}"

                translated_chunks.append(translated_chunk)

            return '. '.join(translated_chunks)

        except Exception as e:
            logging.error(f"Translation error: {e}")
            return text

    def clean_text(self, text: str) -> str:
        """Clean and normalize text"""
        # Remove extra whitespace
        text = ' '.join(text.split())
        # Remove special characters but keep punctuation
        text = re.sub(r'[^\w\s.,!?-]', '', text)
        return text.strip()

    def process_lines(self, lines):
        """Process transcript lines with enhanced cleaning and translation"""
        processed_lines = []

        for line in lines:
            if ":" not in line:
                continue

            try:
                speaker, text = line.split(":", 1)
                speaker = speaker.strip()
                text = text.strip()

                if not text or len(text.split()) < 2:
                    continue

                cleaned_text = self.clean_text(text)
                if not cleaned_text:
                    continue

                translated_text = self.translate_text(cleaned_text)
                processed_lines.append(f"{speaker}: {translated_text}")

            except Exception as e:
                logging.error(f"Error processing line: {line}. Error: {e}")
                continue

        return processed_lines

# Initialize Whisper model and processor
# Using a public model instead of the private one
processor = AutoProcessor.from_pretrained("openai/whisper-small")
whisper_model = AutoModelForSpeechSeq2Seq.from_pretrained("openai/whisper-small")

# Load speaker model - commented out as the model file is missing
# model_speaker = load_model("speaker-model.keras")
# Using a placeholder for now
model_speaker = None

# Path setup
data_directory = "DATA"
audio_folder = "audio"
audio_path = os.path.join(data_directory, audio_folder)

# Check if the data directory exists
try:
    if not os.path.exists(data_directory):
        os.makedirs(data_directory)
    if not os.path.exists(audio_path):
        os.makedirs(audio_path)
    class_names = os.listdir(audio_path)
    logging.info(f"Detected classes: {class_names}")
except Exception as e:
    logging.info(f"Error setting up data directories: {e}")
    class_names = ["Speaker1", "Speaker2"]  # Default class names

# Constants
CONFIDENCE_THRESHOLD = 0.6
SAMPLE_RATE = 16000

# Load pyannote models - using public model without token
try:
    segmentation_model = Model.from_pretrained("pyannote/segmentation-3.0")
except Exception as e:
    print(f"Error loading segmentation model: {e}")
    # Fallback to a simpler model or None
    segmentation_model = None

# Initialize pipelines
try:
    if segmentation_model is not None:
        vad_pipeline = VoiceActivityDetection(segmentation=segmentation_model)
        vad_pipeline.instantiate({"min_duration_on": 0.5, "min_duration_off": 0.0})

        osd_pipeline = OverlappedSpeechDetection(segmentation=segmentation_model)
        osd_pipeline.instantiate({"min_duration_on": 0.0, "min_duration_off": 0.0})
    else:
        logging.info("Segmentation model not available, VAD and OSD pipelines will not be available")
        vad_pipeline = None
        osd_pipeline = None
except Exception as e:
    logging.info(f"Error initializing pipelines: {e}")
    vad_pipeline = None
    osd_pipeline = None

def audio_to_fft(audio, expected_length=8000):
    audio = audio[:expected_length] if tf.shape(audio)[0] > expected_length else tf.pad(audio, [[0, expected_length - tf.shape(audio)[0]]])
    audio = tf.expand_dims(audio, axis=-1)
    fft = tf.signal.fft(tf.cast(tf.complex(real=audio, imag=tf.zeros_like(audio)), tf.complex64))
    fft = tf.expand_dims(fft, axis=1)
    return tf.math.abs(fft[:, :(expected_length // 2), :])

def reduce_noise(audio, sample_rate):
    return nr.reduce_noise(y=audio, sr=sample_rate)

def normalize_volume(audio):
    return librosa.util.normalize(audio)

def segment_audio_by_vad(audio_path):
    if vad_pipeline is None:
        logging.info("VAD pipeline not available, using simple segmentation")
        # Simple fallback: create segments of 10 seconds each
        audio_duration = librosa.get_duration(path=audio_path)
        segment_length = 10.0  # 10 seconds per segment
        return [(i, min(i + segment_length, audio_duration))
                for i in np.arange(0, audio_duration, segment_length)]

    vad = vad_pipeline(audio_path)
    return [(segment.start, segment.end) for segment in vad.get_timeline().support()]

def detect_overlapping_speech(audio_path):
    if osd_pipeline is None:
        logging.info("OSD pipeline not available, assuming no overlapping speech")
        return []  # Return empty list (no overlapping segments)

    osd = osd_pipeline(audio_path)
    return [(segment.start, segment.end) for segment in osd.get_timeline().support()]

def filter_non_overlapping_segments(segments, overlapping_segments):
    return [segment for segment in segments
            if not any(segment[0] < os_end and segment[1] > os_start
                      for (os_start, os_end) in overlapping_segments)]

def predict_speaker_for_segments(segments, audio_path, class_names):
    # If model_speaker is None, return default speaker labels
    if model_speaker is None:
        logging.info("Speaker model not available, using default speaker labels")
        return [("Speaker", 1.0) for _ in segments]

    speaker_predictions = []
    segment_samples_list = []

    for start, end in segments:
        segment_samples, _ = librosa.load(audio_path, sr=SAMPLE_RATE, offset=start, duration=end-start)
        segment_samples = reduce_noise(segment_samples, SAMPLE_RATE)
        segment_samples = normalize_volume(segment_samples)
        segment_samples_list.append(segment_samples)

    audio_tensors = [tf.convert_to_tensor(samples, dtype=tf.float32) for samples in segment_samples_list]
    fft_list = [audio_to_fft(tensor, expected_length=8000) for tensor in audio_tensors]
    fft_batch = tf.stack(fft_list, axis=0)
    predictions = model_speaker.predict(fft_batch)

    return [(class_names[np.argmax(pred)], np.max(pred)) if np.max(pred) >= CONFIDENCE_THRESHOLD
            else ("Unknown", np.max(pred)) for pred in predictions]

def transcribe_with_whisper(segments, audio_path):
    transcriptions = []
    device = "cuda" if torch.cuda.is_available() else "cpu"
    whisper_model.to(device)

    for start, end in segments:
        # Load and process audio
        segment_samples, sr = librosa.load(audio_path, sr=16000, offset=start, duration=end-start)
        segment_samples = reduce_noise(segment_samples, sr)
        segment_samples = normalize_volume(segment_samples)

        # Process audio input
        features = processor(
            segment_samples,
            sampling_rate=16000,
            return_tensors="pt"
        )

        # Move features to device
        features = {k: v.to(device) for k, v in features.items()}

        # Generate transcription
        with torch.no_grad():
            predicted_ids = whisper_model.generate(
                features["input_features"],
                max_length=225
            )

            # Decode the output
            transcription = processor.batch_decode(
                predicted_ids,
                skip_special_tokens=True
            )[0].strip()

            transcriptions.append(transcription)

    return transcriptions

def post_process_transcript(text, patterns, processor):
    processed_text = text.lower()

    # Apply academic patterns first
    for pattern, replacement in patterns.items():
        processed_text = re.sub(pattern, replacement, processed_text, flags=re.IGNORECASE)

    # Apply Filipino corrections
    for pattern, replacement in processor.filipino_corrections.items():
        processed_text = re.sub(pattern, replacement, processed_text, flags=re.IGNORECASE)

    # Apply time format corrections
    for pattern, replacement in processor.time_formats.items():
        processed_text = re.sub(pattern, replacement, processed_text, flags=re.IGNORECASE)

    # Clean up spacing
    processed_text = ' '.join(processed_text.split())

    # Fix capitalization after sentence endings
    processed_text = re.sub(r'([.!?]\s+)([a-z])', lambda m: m.group(1) + m.group(2).upper(), processed_text)

    # Capitalize sentences
    sentences = re.split(r'([.!?]+)', processed_text)
    processed_text = ''.join(s.capitalize() if i % 2 == 0 and s.strip() else s
                            for i, s in enumerate(sentences))

    return processed_text

def create_transcript_with_speaker_labels(audio_file):
    try:
        logging.info(f"Starting transcript creation for file: {audio_file}")

        # Verify file exists
        if not os.path.exists(audio_file):
            raise FileNotFoundError(f"Audio file not found: {audio_file}")

        # Log file details
        logging.info(f"File size: {os.path.getsize(audio_file)} bytes")

        # Segment audio
        logging.info("Starting VAD segmentation...")
        segments = segment_audio_by_vad(audio_file)
        logging.info(f"Found {len(segments)} segments")

        logging.info("Detecting overlapping speech...")
        overlapping_segments = detect_overlapping_speech(audio_file)
        logging.info(f"Found {len(overlapping_segments)} overlapping segments")

        non_overlapping_segments = filter_non_overlapping_segments(segments, overlapping_segments)
        logging.info(f"Processing {len(non_overlapping_segments)} non-overlapping segments")

        if len(non_overlapping_segments) == 0:
            raise ValueError("No valid segments found in audio")

        with ThreadPoolExecutor() as executor:
            logging.info("Starting speaker prediction...")
            speaker_futures = executor.submit(predict_speaker_for_segments,
                                           non_overlapping_segments,
                                           audio_file,
                                           class_names)

            logging.info("Starting transcription...")
            transcription_futures = executor.submit(transcribe_with_whisper,
                                                  non_overlapping_segments,
                                                  audio_file)

            speakers = speaker_futures.result()
            transcriptions = transcription_futures.result()

        logging.info(f"Got {len(speakers)} speaker predictions and {len(transcriptions)} transcriptions")

        # Validate results
        if not speakers or not transcriptions:
            raise ValueError("Failed to get speakers or transcriptions")

        combined_transcript = []
        previous_speaker = None
        combined_text = ""

        for (speaker, confidence), text in zip(speakers, transcriptions):
            logging.info(f"Processing segment - Speaker: {speaker} (conf: {confidence:.2f}), Text: {text[:50]}...")

            if not text.strip():
                continue

            if speaker == previous_speaker:
                combined_text += " " + text
            else:
                if previous_speaker:
                    combined_transcript.append(f"{previous_speaker}: {combined_text.strip()}")
                previous_speaker = speaker
                combined_text = text

        if previous_speaker:
            combined_transcript.append(f"{previous_speaker}: {combined_text.strip()}")

        logging.info(f"Final transcript has {len(combined_transcript)} lines")
        return combined_transcript

    except Exception as e:
        logging.error(f"Error in create_transcript_with_speaker_labels: {str(e)}", exc_info=True)
        raise

def get_transcript_directory():
    # Get the project root directory from the uploaded file path
    project_root = os.path.dirname(os.path.dirname(__file__))  # Go up two levels from python dir
    transcript_dir = os.path.join(project_root, "transcript-whisper")

    # Create the directory if it doesn't exist
    os.makedirs(transcript_dir, exist_ok=True)

    return transcript_dir

def main():
    # Redirect all stdout to prevent non-JSON output
    original_stdout = sys.stdout
    sys.stdout = open(os.devnull, 'w')

    try:
        # Configure logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            filename='process_audio.log',  # Log to file instead of stdout
            filemode='a'
        )

        # Validate command line arguments
        if len(sys.argv) < 2:
            raise ValueError("No input file provided")

        input_audio_path = sys.argv[1]
        logging.info(f"Processing audio file: {input_audio_path}")

        # Validate input file
        if not os.path.exists(input_audio_path):
            raise FileNotFoundError(f"Input file not found: {input_audio_path}")

        # Check file size
        file_size = os.path.getsize(input_audio_path)
        logging.info(f"File size: {file_size} bytes")

        # Validate file can be opened
        try:
            with open(input_audio_path, 'rb') as f:
                f.read(1024)  # Try reading first 1KB
        except Exception as e:
            raise IOError(f"Cannot read input file: {str(e)}")

        # Process the audio file
        transcript_lines = create_transcript_with_speaker_labels(input_audio_path)

        if not transcript_lines:
            raise ValueError("No transcript generated")

        # Setup output paths
        transcript_dir = get_transcript_directory()
        base_name = os.path.splitext(os.path.basename(input_audio_path))[0]
        output_path = os.path.join(transcript_dir, f"{base_name}_transcript.txt")

        # Save transcript
        with open(output_path, "w", encoding="utf-8") as f:
            f.write("\n".join(transcript_lines))

        # Return success response
        result = {
            "status": "success",
            "data": {
                "file_path": output_path,
                "transcript": "\n".join(transcript_lines),
                "speakers": list(set(line.split(":")[0].strip() for line in transcript_lines)),
                "duration": 0  # Add actual duration if available
            }
        }

        # Restore stdout for final JSON output
        sys.stdout = original_stdout
        print(json.dumps(result))

    except Exception as e:
        # Restore stdout for error output
        sys.stdout = original_stdout
        error_info = {
            "status": "error",
            "error": str(e),
            "traceback": traceback.format_exc()
        }
        logging.error(f"Processing error: {str(e)}")
        logging.error(traceback.format_exc())
        print(json.dumps(error_info))
        sys.exit(1)
    finally:
        # Make sure stdout is restored
        sys.stdout = original_stdout

if __name__ == "__main__":
    main()
