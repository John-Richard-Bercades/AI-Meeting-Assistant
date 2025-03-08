import sys
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import librosa
import logging
from pyannote.audio import Model
from pyannote.audio.pipelines import VoiceActivityDetection
import soundfile as sf
import torch
from concurrent.futures import ThreadPoolExecutor
import noisereduce as nr
import speech_recognition as sr
from tqdm import tqdm
import json
import tempfile
import shutil

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class AudioProcessor:
    def __init__(self):
        self.temp_dir = tempfile.mkdtemp()
        self.progress = 0
        self.status = "Initializing"
        
        try:
            # Get the absolute path to the script's directory
            script_dir = os.path.dirname(os.path.abspath(__file__))
            
            # Load speaker model
            model_path = os.path.join(script_dir, "models", "speaker-model.keras")
            self.model_speaker = load_model(model_path)
            
            # Load pyannote model
            self.segmentation_model = Model.from_pretrained(
                "pyannote/segmentation-3.0",
                use_auth_token="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"
            )
            
            # Load class names
            data_path = os.path.join(script_dir, "DATA", "audio")
            self.class_names = os.listdir(data_path)
            
            # Initialize VAD pipeline
            self.pipeline = VoiceActivityDetection(segmentation=self.segmentation_model)
            self.pipeline.instantiate({"min_duration_on": 0.0, "min_duration_off": 0.0})
            
        except Exception as e:
            self.cleanup()
            raise Exception(f"Initialization failed: {str(e)}")

    def update_progress(self, value, status):
        self.progress = value
        self.status = status
        # Write progress to a temporary file that can be read by the main process
        progress_file = os.path.join(self.temp_dir, "progress.json")
        with open(progress_file, "w") as f:
            json.dump({"progress": value, "status": status}, f)

    def process_audio(self, audio_path):
        try:
            self.update_progress(0, "Starting audio processing")
            
            # Validate input file
            if not os.path.exists(audio_path):
                raise FileNotFoundError(f"Audio file not found: {audio_path}")
            
            # Segment audio
            self.update_progress(20, "Segmenting audio")
            segments = self.segment_audio_by_vad(audio_path)
            
            # Process segments
            self.update_progress(40, "Processing segments")
            speaker_predictions = self.predict_speaker_for_segments(segments, audio_path)
            
            # Transcribe audio
            self.update_progress(60, "Transcribing audio")
            transcriptions = self.transcribe_segments_with_speech_recognition(segments, audio_path)
            
            # Combine results
            self.update_progress(80, "Generating transcript")
            transcript = []
            for i, segment in enumerate(segments):
                speaker, confidence = speaker_predictions[i]
                text = transcriptions[i]
                transcript.append(f"{speaker}: {text}")
            
            # Save transcript
            output_path = os.path.splitext(audio_path)[0] + "_transcript.txt"
            with open(output_path, "w", encoding='utf-8') as f:
                for line in transcript:
                    f.write(line + "\n")
            
            self.update_progress(100, "Processing complete")
            return output_path
            
        except Exception as e:
            self.update_progress(-1, f"Error: {str(e)}")
            raise
        finally:
            self.cleanup()

    def cleanup(self):
        """Clean up temporary files and directories"""
        try:
            shutil.rmtree(self.temp_dir)
        except Exception as e:
            logger.error(f"Error cleaning up temporary files: {str(e)}")

    # Define confidence threshold for "Unknown" classification
    CONFIDENCE_THRESHOLD = 0.6  # Adjust this value as needed

    # Define the audio_to_fft function with manual padding and truncating
    def audio_to_fft(self, audio, expected_length=8000):
        audio = audio[:expected_length] if tf.shape(audio)[0] > expected_length else tf.pad(audio, [[0, expected_length - tf.shape(audio)[0]]])
        audio = tf.expand_dims(audio, axis=-1)
        fft = tf.signal.fft(tf.cast(tf.complex(real=audio, imag=tf.zeros_like(audio)), tf.complex64))
        fft = tf.expand_dims(fft, axis=1)
        return tf.math.abs(fft[:, :(expected_length // 2), :])

    # Function to reduce noise in audio
    def reduce_noise(self, audio, sample_rate):
        reduced_noise_audio = nr.reduce_noise(y=audio, sr=sample_rate)
        return reduced_noise_audio

    # Function to normalize volume of audio
    def normalize_volume(self, audio):
        normalized_audio = librosa.util.normalize(audio)
        return normalized_audio

    # Step 1: Segment the meeting audio using pyannote VAD
    def segment_audio_by_vad(self, audio_path):
        vad = self.pipeline(audio_path)
        segments = []
        for segment in vad.get_timeline().support():
            start, end = segment.start, segment.end
            segments.append((start, end))
        return segments

    # Step 2: Predict the speaker for given segments with confidence threshold
    def predict_speaker_for_segments(self, segments, audio_path, sample_rate=16000):
        speaker_predictions = []
        segment_samples_list = []

        # Load segment samples first
        for segment in segments:
            start, end = segment
            segment_samples, _ = librosa.load(audio_path, sr=sample_rate, offset=start, duration=end-start)
            # Apply noise reduction and volume normalization
            segment_samples = self.reduce_noise(segment_samples, sample_rate)
            segment_samples = self.normalize_volume(segment_samples)
            segment_samples_list.append(segment_samples)

        audio_tensors = [tf.convert_to_tensor(samples, dtype=tf.float32) for samples in segment_samples_list]
        fft_list = [self.audio_to_fft(tensor, expected_length=8000) for tensor in audio_tensors]
        fft_batch = tf.stack(fft_list, axis=0)
        predictions = self.model_speaker.predict(fft_batch)
        
        for prediction in predictions:
            max_confidence = np.max(prediction)
            predicted_label = np.argmax(prediction)
            if max_confidence >= self.CONFIDENCE_THRESHOLD:
                speaker_name = self.class_names[predicted_label]
            else:
                speaker_name = "Unknown"
            speaker_predictions.append((speaker_name, max_confidence))

        return speaker_predictions

    # Step 3: Transcribe segments using speech_recognition (English and Filipino)
    def transcribe_segments_with_speech_recognition(self, segments, audio_path):
        recognizer = sr.Recognizer()
        transcriptions = []

        for segment in segments:
            start, end = segment
            segment_samples, sample_rate = librosa.load(audio_path, sr=None, offset=start, duration=end-start)
            # Apply noise reduction and volume normalization
            segment_samples = self.reduce_noise(segment_samples, sample_rate)
            segment_samples = self.normalize_volume(segment_samples)
            sf.write("temp_segment.wav", segment_samples, sample_rate)

            # Use speech_recognition to transcribe the segment
            with sr.AudioFile("temp_segment.wav") as source:
                audio_data = recognizer.record(source)
                text = ""

                # Try English first
                try:
                    text_en = recognizer.recognize_google(audio_data, language="en-US")
                    text += text_en + " "
                except sr.UnknownValueError:
                    print(f"Google Speech Recognition could not understand the segment from {start} to {end} in English.")
                except sr.RequestError as e:
                    print(f"Could not request results from Google Speech Recognition service for English; {e}")

                # Try Filipino next
                try:
                    text_fil = recognizer.recognize_google(audio_data, language="fil-PH")
                    text += text_fil + " "
                except sr.UnknownValueError:
                    print(f"Google Speech Recognition could not understand the segment from {start} to {end} in Filipino.")
                except sr.RequestError as e:
                    print(f"Could not request results from Google Speech Recognition service for Filipino; {e}")

                transcriptions.append(text.strip())

            # Clean up the temporary file
            os.remove("temp_segment.wav")

        return transcriptions

    # Step 4: Process each segment for speaker labeling and transcription
    def create_transcript_with_speaker_labels(self, audio_file):
        transcript = []
        segments = self.segment_audio_by_vad(audio_file)
        
        logging.info(f"Total segments found: {len(segments)}")

        with ThreadPoolExecutor() as executor:
            speaker_futures = executor.submit(self.predict_speaker_for_segments, segments, audio_file)
            transcription_futures = executor.submit(self.transcribe_segments_with_speech_recognition, segments, audio_file)
            
            speakers = speaker_futures.result()
            transcriptions = transcription_futures.result()

            for i, segment in enumerate(segments):
                speaker, confidence = speakers[i]
                text = transcriptions[i]
                transcript.append(f"{speaker}: {text}")

        return transcript

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python process_audio.py <audio_file_path>")
        sys.exit(1)

    try:
        processor = AudioProcessor()
        output_path = processor.process_audio(sys.argv[1])
        print(json.dumps({
            "status": "success",
            "output_path": output_path
        }))
    except Exception as e:
        print(json.dumps({
            "status": "error",
            "error": str(e)
        }))
        sys.exit(1)
