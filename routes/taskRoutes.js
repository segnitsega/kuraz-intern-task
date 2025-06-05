const express = require('express');
const Task = require('../model/taskModel');
const router = express.Router();

router.get('/', async (req, res) => {
  const { status } = req.query;

  let filter = {};
  if (status === 'completed') filter.completed = true;
  else if (status === 'pending') filter.completed = false;

  try {
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/', async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required and cannot be empty' });
  }

  try {
    const task = new Task({ title: title.trim() });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
});

module.exports = router;
