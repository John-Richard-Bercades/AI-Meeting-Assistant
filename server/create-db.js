const mysql = require('mysql2/promise');
require('dotenv').config();

async function createDatabase() {
  let connection;
  
  try {
    // Connect to MySQL without specifying a database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3307,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });
    
    console.log('Connected to MySQL server');
    
    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'meeting_assistant';
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`Database '${dbName}' created or already exists`);
    
    // Use the database
    await connection.query(`USE ${dbName}`);
    
    // Create users table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created or already exists');
    
    // Create minutes table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS minutes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        file_path VARCHAR(255),
        duration INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('Minutes table created or already exists');
    
    // Check if there are any users
    const [users] = await connection.query('SELECT COUNT(*) as count FROM users');
    const userCount = users[0].count;
    
    if (userCount === 0) {
      // Create a test user if no users exist
      const hashedPassword = await require('bcrypt').hash('password123', 10);
      await connection.query(`
        INSERT INTO users (username, password, email, first_name, last_name)
        VALUES ('testuser', ?, 'test@example.com', 'Test', 'User')
      `, [hashedPassword]);
      console.log('Test user created with username: testuser, password: password123');
    } else {
      console.log(`Database already has ${userCount} users`);
    }
    
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Database setup error:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
    process.exit();
  }
}

createDatabase();
