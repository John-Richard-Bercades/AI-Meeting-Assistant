const app = require('./app');
const db = require('./database');
require('dotenv').config();

const port = process.env.PORT || 3001;

// Create uploads directory if it doesn't exist
const fs = require('fs');
const path = require('path');
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Test database connection before starting server
async function startServer() {
  try {
    // Test database connection
    const dbConnected = await db.testConnection();

    if (dbConnected) {
      console.log('Database connection successful');
    } else {
      console.warn('Warning: Database connection failed. Server will start but database features may not work.');
    }

    // Start the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      console.log('Press Ctrl+C to quit.');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
