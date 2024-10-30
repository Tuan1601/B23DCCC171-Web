const express = require('express');
const router = express.Router();

const db = require('../configs/database');

router.get('/', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).send('Internal server error');
        }
        res.json(results);
    });
});