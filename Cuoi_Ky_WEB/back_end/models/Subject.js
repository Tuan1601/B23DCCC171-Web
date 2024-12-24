const db = require('../config/db');

class Subject {
    static async create({ name, description }) {
        const query = 'INSERT INTO subjects (name, description) VALUES (?, ?)';
        try {
            const [result] = await db.execute(query, [name, description]);
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async getAll() {
        const query = 'SELECT * FROM subjects';
        try {
            const [rows] = await db.execute(query);
            return rows;
        } catch (err) {
            throw err;
        }
    }
}


module.exports = Subject;
