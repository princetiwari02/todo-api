const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { getTodos, getTodoById, createTodo, updateTodo, deleteTodo, completeTodo } = require('../controllers/todo.controller');

router.use(auth);
router.get('/', getTodos);
router.get('/:id', getTodoById);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id/complete', completeTodo);

module.exports = router;
