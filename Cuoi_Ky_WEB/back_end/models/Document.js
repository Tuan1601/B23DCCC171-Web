const db = require('../config/db');

class Document {
    static create({ title, description, file_name, file_type, subject_id, uploaded_by }) {
        const query = 'INSERT INTO documents (title, description, file_name, file_type, subject_id, uploaded_by) VALUES (?, ?, ?, ?, ?, ?)';
        return db.query(query, [title, description, file_name, file_type, subject_id, uploaded_by]);
    }

    static getAll() {
        const query = `
          SELECT d.id, d.title, d.description, d.file_name, d.file_type, 
                 d.subject_id, s.name as subject_name, d.is_approved 
          FROM documents d 
          JOIN subjects s ON d.subject_id = s.id 
          WHERE d.is_approved = 1
        `;
        return db.query(query).then(([rows]) => rows); // Trả về kết quả
    }
    
    static getBySubject(subject_id) {
        const query = 'SELECT * FROM documents WHERE subject_id = ? AND is_approved = 1';
        return db.query(query, [subject_id]).then(([rows]) => rows);  // Trả về chỉ dữ liệu (rows)
    }

    static updateApprovalStatus(document_id, status) {
      const isApproved = status === 'approved' ? 1 : 0;
      const query = 'UPDATE documents SET is_approved = ? WHERE id = ?';
      return db.query(query, [isApproved, document_id]);
  }

  static async getUnapproved() {
    const query = `
      SELECT d.id, d.title, d.file_name, d.subject_id, s.name as subject_name, d.is_approved, d.file_type 
      FROM documents d 
      JOIN subjects s ON d.subject_id = s.id 
      WHERE d.is_approved = 0
    `;
    try {
      const [rows] = await db.execute(query);
      return rows;
    } catch (err) {
      throw err;
    }
  }
}  

module.exports = Document;
