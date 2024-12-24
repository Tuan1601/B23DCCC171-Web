const db = require('../config/db');

class Approval {
    static create({ document_id, approved_by, status, reason }) {
        const query = 'INSERT INTO approvals (document_id, approved_by, status, reason) VALUES (?, ?, ?, ?)';
        return db.query(query, [document_id, approved_by, status, reason]);
    }
}

module.exports = Approval;
