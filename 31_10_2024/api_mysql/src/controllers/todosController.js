const Todos = require('../models/todos.js');

exports.getAllTodos = (req, res) => {
    Todos.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json(results);
    });
};

exports.createTodos = (req, res) => {
    const { title, description, due_date } = req.body;
    Todos.create(title, description, due_date, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({message: 'Todo created successfully'});
    });
};

exports.updateTodos = (req, res) => {
    const { id } = req.params;
    const { title, description, due_date, completed } = req.body;
    Todos.update(id, title, description, due_date, completed, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({message: 'Todo updated successfully'});
    });
};

exports.deleteTodos = (req, res) => {
    const { id } = req.params;
    Todos.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({message: 'Todo delete successfully'});
    });
};
