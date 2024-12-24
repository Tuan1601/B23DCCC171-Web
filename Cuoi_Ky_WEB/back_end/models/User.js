const db = require('../config/db');

class User {
  static async create(user) {
    const [result] = await db.query(
      'INSERT INTO users (username, password_hash, email, role) VALUES (?, ?, ?, ?)',
      [user.username, user.password_hash, user.email, user.role]
    );
    return result;
  }

  static async findByUsername(username) {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }
  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await db.query(query, [id]);
    return rows[0]; 
  }
  
  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await db.query(query, [username]);
    return rows[0]; 
  }
}

module.exports = User;

