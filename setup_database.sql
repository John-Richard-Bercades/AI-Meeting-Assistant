-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS meeting_assistant;

-- Use the database
USE meeting_assistant;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create minutes table
CREATE TABLE IF NOT EXISTS minutes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_path VARCHAR(255),
  transcript TEXT,
  user_id INT,
  duration INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create speakers table
CREATE TABLE IF NOT EXISTS speakers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  minute_id INT,
  FOREIGN KEY (minute_id) REFERENCES minutes(id)
);

-- Insert a test user (password: password123)
INSERT INTO users (username, password, email, first_name, last_name)
VALUES ('testuser', '$2b$10$6KhZKNbqUz.2vQxCQVJVDuLbwuGYwMpQAq7MbeMRzlRNKcWchMZHK', 'test@example.com', 'Test', 'User');
