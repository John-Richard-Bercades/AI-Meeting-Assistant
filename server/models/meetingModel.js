const db = require('../database');

const meetingModel = {
  // Create a new meeting
  async create(userId, title, description, filePath, duration) {
    const sql = 'INSERT INTO meetings (user_id, title, description, file_path, duration) VALUES (?, ?, ?, ?, ?)';
    const result = await db.query(sql, [userId, title, description, filePath, duration]);
    return { id: result.insertId, userId, title, description, filePath, duration };
  },

  // Get all meetings for a user
  async getAllByUser(userId) {
    const sql = 'SELECT * FROM meetings WHERE user_id = ? ORDER BY created_at DESC';
    return await db.query(sql, [userId]);
  },

  // Get meeting by ID
  async getById(id, userId) {
    const sql = 'SELECT * FROM meetings WHERE id = ? AND user_id = ?';
    const meetings = await db.query(sql, [id, userId]);
    return meetings[0];
  },

  // Save transcript for a meeting
  async saveTranscript(meetingId, fullText, speakers) {
    const sql = 'INSERT INTO transcripts (meeting_id, full_text, speakers) VALUES (?, ?, ?)';
    const speakersJson = JSON.stringify(speakers);
    const result = await db.query(sql, [meetingId, fullText, speakersJson]);
    return { id: result.insertId, meetingId, fullText, speakers };
  },

  // Get transcript for a meeting
  async getTranscript(meetingId) {
    const sql = 'SELECT * FROM transcripts WHERE meeting_id = ?';
    const transcripts = await db.query(sql, [meetingId]);
    return transcripts[0];
  }
};

module.exports = meetingModel;
