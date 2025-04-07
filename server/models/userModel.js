const db = require('../database');
const bcrypt = require('bcrypt');

// Hash password using bcrypt (more secure than SHA-256)
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Compare password with hashed password
async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

const userModel = {
  // Create a new user
  async create(username, password, email, firstName = '', lastName = '') {
    const hashedPassword = await hashPassword(password);
    const sql = 'INSERT INTO users (username, password, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)';
    try {
      const result = await db.query(sql, [username, hashedPassword, email, firstName, lastName]);
      return { id: result.insertId, username, email, firstName, lastName };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Username or email already exists');
      }
      throw error;
    }
  },

  // Find user by username
  async findByUsername(username) {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const users = await db.query(sql, [username]);
    return users[0];
  },

  // Authenticate user
  async authenticate(username, password) {
    const user = await this.findByUsername(username);
    if (!user) return null;

    const passwordMatch = await comparePassword(password, user.password);
    if (passwordMatch) {
      // Don't return the password
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }
};

module.exports = userModel;
