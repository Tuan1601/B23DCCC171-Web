const Users = require('../models/users.js');

exports.getAllUsers = (req, res) => {
    Users.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json(results);
    });
};

exports.createUsers = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    Users.create(name, email, password, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'User created successfully' });
    });
};

exports.updateUsers = (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
        return res.status(400).json({ error: 'At least one field is required for update.' });
    }

    Users.update(id, name, email, password, (err, result) => {
        if (err) {
            if (err.code === 'NOT_FOUND') { 
                return res.status(404).json({ error: 'User not found.' });
            }
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'User updated successfully' });
    });
};

exports.deleteUsers = (req, res) => {
    const { id } = req.params;

    Users.delete(id, (err, result) => {
        if (err) {
            if (err.code === 'NOT_FOUND') { 
                return res.status(404).json({ error: 'User not found.' });
            }
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
};
