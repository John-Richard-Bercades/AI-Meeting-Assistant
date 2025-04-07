from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import logging
import traceback
from werkzeug.utils import secure_filename
import json

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='flask_app.log',
    filemode='a'
)

app = Flask(__name__)
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'flask_uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Configure transcript folder
TRANSCRIPT_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'transcripts')
os.makedirs(TRANSCRIPT_FOLDER, exist_ok=True)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({"status": "healthy"})

@app.route('/process-audio', methods=['POST'])
def process_audio():
    """Process uploaded audio file and return transcript."""
    try:
        # Check if file is in request
        if 'file' not in request.files:
            return jsonify({"status": "error", "error": "No file part"}), 400
        
        file = request.files['file']
        
        # Check if file is selected
        if file.filename == '':
            return jsonify({"status": "error", "error": "No file selected"}), 400
        
        # Save the file
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        logging.info(f"Received file: {filename}, size: {os.path.getsize(file_path)} bytes")
        
        # Create a simple transcript (placeholder)
        transcript_lines = [
            "Speaker 1: Hello and welcome to the meeting.",
            "Speaker 2: Thank you for joining us today.",
            "Speaker 1: Let's discuss the agenda for today.",
            "Speaker 2: We have several items to cover.",
            "Speaker 1: First, let's talk about the project status.",
            "Speaker 2: The project is progressing well.",
            "Speaker 1: Great, let's move on to the next item."
        ]
        
        # Save transcript
        base_name = os.path.splitext(filename)[0]
        output_path = os.path.join(TRANSCRIPT_FOLDER, f"{base_name}_transcript.txt")
        
        with open(output_path, "w", encoding="utf-8") as f:
            f.write("\n".join(transcript_lines))
        
        # Return success response
        return jsonify({
            "status": "success",
            "data": {
                "file_path": output_path,
                "transcript": "\n".join(transcript_lines),
                "speakers": ["Speaker 1", "Speaker 2"],
                "duration": 0  # Placeholder
            }
        })
        
    except Exception as e:
        logging.error(f"Error processing audio: {str(e)}")
        logging.error(traceback.format_exc())
        return jsonify({
            "status": "error",
            "error": str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
