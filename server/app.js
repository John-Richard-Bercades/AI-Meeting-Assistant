const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { PythonShell } = require('python-shell');

const app = express();
const port = 3001;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// File upload endpoint
app.post('/api/process-audio', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      console.error('No file received in request');
      return res.status(400).json({ 
        status: 'error',
        error: 'No file uploaded' 
      });
    }

    console.log('Received file:', {
      filename: req.file.originalname,
      size: req.file.size,
      path: req.file.path,
      mimetype: req.file.mimetype
    });

    // Python script options
    let options = {
      mode: 'json',
      pythonPath: 'python',
      scriptPath: path.join(__dirname, '..', 'python'),
      args: [req.file.path],
      pythonOptions: ['-u']  // Unbuffered output
    };

    // Run Python script
    PythonShell.run('process_audio.py', options)
      .then(results => {
        if (!results || results.length === 0) {
          throw new Error('No output from Python script');
        }

        const pythonResponse = JSON.parse(results[results.length - 1]);
        console.log('Python script response:', pythonResponse);

        if (pythonResponse.status === 'error') {
          throw new Error(pythonResponse.error || 'Python processing failed');
        }

        const response = {
          status: 'success',
          result: {
            data: {
              file_path: pythonResponse.data.file_path,
              transcript: pythonResponse.data.transcript || '',
              speakers: pythonResponse.data.speakers || []
            }
          },
          file: {
            name: req.file.originalname,
            size: req.file.size,
            type: req.file.mimetype,
            duration: pythonResponse.data.duration || 0
          }
        };

        return res.json(response);
      })
      .catch(err => {
        console.error('Python script error:', err);
        return res.status(500).json({ 
          status: 'error',
          error: `Processing error: ${err.message}`,
          details: err.stack
        });
      });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      status: 'error',
      error: `Server error: ${error.message}`,
      details: error.stack
    });
  }
});

// Export the app before starting the server
module.exports = app;
