const Todo = require('../models/todo.model');

// GET /api/todos
exports.getTodos = async (req, res) => {
  try {
    const { status, priority, category, tag, overdue, page = 1, limit = 20, sort = '-createdAt' } = req.query;
    const query = { user: req.user.id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;
    if (tag) query.tags = tag.toLowerCase();
    if (overdue === 'true') {
      query.dueDate = { $lt: new Date() };
      query.status = { $nin: ['completed', 'cancelled'] };
    }

    const todos = await Todo.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Todo.countDocuments(query);

    // Summary stats
    const stats = await Todo.aggregate([
      { $match: { user: require('mongoose').Types.ObjectId.createFromHexString(req.user.id) } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({ total, page: Number(page), todos, stats });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/todos/:id
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/todos
exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({ ...req.body, user: req.user.id });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/todos/:id
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    Object.assign(todo, req.body);
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/todos/:id
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/todos/:id/complete
exports.completeTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    todo.status = 'completed';
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
