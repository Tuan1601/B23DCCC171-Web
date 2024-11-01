/*const db = require('../configs/database');

const Users = {
    getAll: (callback) => {
        db.query('SELECT * FROM users', callback);
    },
    create: (name, email, password, callback) => {
        db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], callback);
    },
    update: (id, name, email, password, callback) => {
        db.query('UPDATE users SET name = ?, email = ?, password = ?, WHERE id = ?', [name, email, password, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM users WHERE id = ?', [id], callback);
    }
};

module.exports = Users;*/
const db = require('../configs/database');

const Users = {
    getAll: (callback) => {
        db.query('SELECT * FROM users', callback);
    },
    create: (name, email, password, callback) => {
        db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], callback);
    },
    update: (id, name, email, password, callback) => {
        db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id], (err, result) => {
            if (err) return callback(err);
            if (result.affectedRows === 0) {
                return callback({ code: 'NOT_FOUND' }); 
            }
            callback(null, result);
        });
    },
    delete: (id, callback) => {
        db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
            if (err) return callback(err);
            if (result.affectedRows === 0) {
                return callback({ code: 'NOT_FOUND' }); 
            }
            callback(null, result);
        });
    }
};

module.exports = Users;
