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

  // Find user by ID
  async getById(userId) {
    console.log('userModel.getById called with userId:', userId);
    const sql = 'SELECT * FROM users WHERE id = ?';
    try {
      const users = await db.query(sql, [userId]);
      console.log('Query result:', users ? `Found ${users.length} users` : 'No results');
      return users[0];
    } catch (error) {
      console.error('Error in getById:', error);
      throw error;
    }
  },

  // Verify user password
  async verifyPassword(userId, password) {
    const user = await this.getById(userId);
    if (!user) return false;
    return await comparePassword(password, user.password);
  },

  // Update user data
  async update(userId, userData) {
    const { firstName, lastName, email, password } = userData;
    let sql = 'UPDATE users SET ';
    const params = [];
    const updates = [];

    if (firstName !== undefined) {
      updates.push('first_name = ?');
      params.push(firstName);
    }

    if (lastName !== undefined) {
      updates.push('last_name = ?');
      params.push(lastName);
    }

    if (email !== undefined) {
      updates.push('email = ?');
      params.push(email);
    }

    if (password) {
      updates.push('password = ?');
      params.push(await hashPassword(password));
    }

    if (updates.length === 0) {
      // No updates to make
      return await this.getById(userId);
    }

    sql += updates.join(', ') + ' WHERE id = ?';
    params.push(userId);

    try {
      await db.query(sql, params);
      return await this.getById(userId);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already exists');
      }
      throw error;
    }
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
