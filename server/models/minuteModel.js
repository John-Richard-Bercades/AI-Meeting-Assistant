const db = require('../database');

const minuteModel = {
  // Create a new minute
  async create(userId, title, description, filePath, duration) {
    const sql = 'INSERT INTO minutes (user_id, title, description, file_path, duration) VALUES (?, ?, ?, ?, ?)';
    const result = await db.query(sql, [userId, title, description, filePath, duration]);
    return { id: result.insertId, userId, title, description, filePath, duration };
  },

  // Get all minutes for a user
  async getAllByUser(userId) {
    const sql = 'SELECT * FROM minutes WHERE user_id = ? ORDER BY created_at DESC';
    return await db.query(sql, [userId]);
  },

  // Get minute by ID
  async getById(id, userId) {
    const sql = 'SELECT * FROM minutes WHERE id = ? AND user_id = ?';
    const minutes = await db.query(sql, [id, userId]);
    return minutes[0];
  },

  // Save transcript for a minute
  async saveTranscript(minuteId, fullText, speakers) {
    const sql = 'INSERT INTO transcripts (minute_id, full_text, speakers) VALUES (?, ?, ?)';
    const speakersJson = JSON.stringify(speakers);
    const result = await db.query(sql, [minuteId, fullText, speakersJson]);
    return { id: result.insertId, minuteId, fullText, speakers };
  },

  // Get transcript for a minute
  async getTranscript(minuteId) {
    const sql = 'SELECT * FROM transcripts WHERE minute_id = ?';
    const transcripts = await db.query(sql, [minuteId]);
    return transcripts[0];
  },

  // Delete a minute
  async delete(id, userId) {
    const sql = 'DELETE FROM minutes WHERE id = ? AND user_id = ?';
    const result = await db.query(sql, [id, userId]);
    if (result.affectedRows === 0) {
      throw new Error('Minute not found or unauthorized access');
    }
    return true;
  }
};

module.exports = minuteModel;

