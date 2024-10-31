const express = require('express');
const router = express.Router();

const todosController = require('../controllers/todosController');

router.get('/todos', todosController.getAllTodos);
router.post('/todos', todosController.createTodos);
router.put('/todos/:id', todosController.updateTodos);
router.delete('/todos/:id', todosController.deleteTodos);


module.exports = router;