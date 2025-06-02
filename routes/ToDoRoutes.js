const express = require('express');
const router = express.Router();
const Todo = require('../models/ToDo');
const isAuthenticated = require('../middleware/isAuth');

// GET all (user-specific)
router.get('/', isAuthenticated, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
});

// POST new
router.post('/', isAuthenticated, async (req, res) => {
  const newTodo = new Todo({
    task: req.body.task,
    userId: req.user.id,
    completed: false
  });
  await newTodo.save();
  res.json(newTodo);
});

// PUT update
router.put('/:id', isAuthenticated, async (req, res) => {
  const updated = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete('/:id', isAuthenticated, async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ msg: 'Deleted' });
});

module.exports = router;
