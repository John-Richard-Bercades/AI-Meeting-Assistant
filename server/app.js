const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { PythonShell } = require('python-shell');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const csrf = require('csurf');
const db = require('./database');
const userModel = require('./models/userModel');
const minuteModel = require('./models/minuteModel');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Rate limiting configuration
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: { status: 'error', error: 'Too many login attempts, please try again later' }
});

const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: { status: 'error', error: 'Too many requests, please try again later' }
});

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
  origin: process.env.NODE_ENV === 'production'
    ? process.env.ALLOWED_ORIGIN
    : 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Apply rate limiting to all requests
app.use(generalLimiter);

// CSRF protection for all non-GET routes
const csrfProtection = csrf({ cookie: {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
}});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      status: 'error',
      error: 'Authentication required'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      status: 'error',
      error: 'Invalid or expired token'
    });
  }
};

// Test endpoint
app.get('/api/test', async (req, res) => {
  try {
    // Test database connection
    const dbConnected = await db.testConnection();

    res.json({
      status: 'ok',
      message: 'Server is running',
      database: dbConnected ? 'connected' : 'disconnected'
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      error: error.message
    });
  }
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

    // Use axios to send the file to Flask
    const axios = require('axios');
    const FormData = require('form-data');
    const fs = require('fs');

    try {
      // Create a FormData object
      const form = new FormData();
      form.append('file', fs.createReadStream(req.file.path));

      // Send the file to Flask for processing
      const flaskResponse = await axios.post('http://localhost:5000/process-audio', form, {
        headers: {
          ...form.getHeaders(),
        },
      });

      console.log('Flask response:', flaskResponse.data);
      const pythonResponse = flaskResponse.data;

      if (pythonResponse.status === 'error') {
        throw new Error(pythonResponse.error || 'Python processing failed');
      }

      // Extract data from Python response
      const filePath = pythonResponse.data.file_path;
      const transcript = pythonResponse.data.transcript || '';
      const speakers = pythonResponse.data.speakers || [];
      const duration = pythonResponse.data.duration || 0;

      // Database integration temporarily disabled
      console.log('Database integration temporarily disabled - not saving to database');

      // Skip database operations and just return the transcript

      // Default response (no database save)
      const response = {
        status: 'success',
        result: {
          data: {
            file_path: filePath,
            transcript: transcript,
            speakers: speakers
          }
        },
        file: {
          name: req.file.originalname,
          size: req.file.size,
          type: req.file.mimetype,
          duration: duration
        }
      };

      return res.json(response);
    } catch (err) {
      console.error('Python script error:', err);
      return res.status(500).json({
        status: 'error',
        error: `Processing error: ${err.message}`,
        details: err.stack
      });
    }

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      status: 'error',
      error: `Server error: ${error.message}`,
      details: error.stack
    });
  }
});

// User registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({
        status: 'error',
        error: 'Missing required fields'
      });
    }

    const user = await userModel.create(username, password, email, firstName, lastName);
    res.status(201).json({
      status: 'success',
      user
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({
      status: 'error',
      error: error.message
    });
  }
});

// User login endpoint with rate limiting
app.post('/api/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: 'error',
        error: 'Username and password are required'
      });
    }

    const user = await userModel.authenticate(username, password);

    if (!user) {
      return res.status(401).json({
        status: 'error',
        error: 'Invalid username or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict'
    });

    res.json({
      status: 'success',
      user
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ status: 'success', message: 'Logged out successfully' });
});

// CSRF token endpoint
app.get('/api/csrf-token', authenticateToken, csrfProtection, (req, res) => {
  res.json({ status: 'success', csrfToken: req.csrfToken() });
});

// Save minute endpoint - protected by authentication and CSRF
app.post('/api/minutes', authenticateToken, csrfProtection, async (req, res) => {
  try {
    const { userId, title, description, filePath, duration } = req.body;

    if (!userId || !title) {
      return res.status(400).json({
        status: 'error',
        error: 'User ID and title are required'
      });
    }

    const minute = await minuteModel.create(userId, title, description, filePath, duration);
    res.status(201).json({
      status: 'success',
      minute
    });
  } catch (error) {
    console.error('Save meeting error:', error);
    res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
});

// Get user minutes endpoint - protected by authentication
app.get('/api/minutes/:userId', authenticateToken, async (req, res) => {
  try {
    // Get userId from the authenticated token
    const authenticatedUserId = req.user.userId;

    // Check if the requested userId matches the authenticated user
    if (authenticatedUserId !== parseInt(req.params.userId)) {
      return res.status(403).json({
        status: 'error',
        error: 'Unauthorized access to other user\'s minutes'
      });
    }

    const minutes = await minuteModel.getAllByUser(authenticatedUserId);
    res.json({
      status: 'success',
      minutes
    });
  } catch (error) {
    console.error('Get minutes error:', error);
    res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
});

// Get minute details endpoint - protected by authentication
app.get('/api/minutes/:userId/:minuteId', authenticateToken, async (req, res) => {
  try {
    const { userId, minuteId } = req.params;
    const minute = await minuteModel.getById(minuteId, userId);

    if (!minute) {
      return res.status(404).json({
        status: 'error',
        error: 'Minute not found'
      });
    }

    // Get transcript if available
    const transcript = await minuteModel.getTranscript(minuteId);

    res.json({
      status: 'success',
      minute,
      transcript
    });
  } catch (error) {
    console.error('Get meeting details error:', error);
    res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
});

// Delete minute endpoint - protected by authentication
app.delete('/api/minutes/:minuteId', authenticateToken, async (req, res) => {
  try {
    const authenticatedUserId = req.user.userId;
    const minuteId = req.params.minuteId;

    // First, verify the minute belongs to the authenticated user
    const minute = await minuteModel.getById(minuteId, authenticatedUserId);
    if (!minute) {
      return res.status(404).json({
        status: 'error',
        error: 'Minute not found or unauthorized access'
      });
    }

    // Delete the minute
    await minuteModel.delete(minuteId, authenticatedUserId);

    res.json({
      status: 'success',
      message: 'Minute deleted successfully'
    });
  } catch (error) {
    console.error('Delete minute error:', error);
    res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
});

// Export the app before starting the server
module.exports = app;
