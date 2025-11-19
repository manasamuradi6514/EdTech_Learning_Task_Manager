const Task = require('../models/Task');
const User = require('../models/User');
const mongoose = require('mongoose');

const getTasks = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    if (role === 'student') {
      // student: tasks they own
      const tasks = await Task.find({ userId: id }).sort({ createdAt: -1 });
      return res.json({ success: true, tasks });
    }

    if (role === 'teacher') {
      // teacher: tasks created by teacher OR tasks belonging to students assigned to this teacher
      // First find students assigned to this teacher
      const students = await User.find({ teacherId: id }, { _id: 1 }).lean();
      const studentIds = students.map(s => s._id);

      const tasks = await Task.find({
        $or: [
          { userId: id }, // tasks created by teacher
          { userId: { $in: studentIds } } // tasks of assigned students
        ]
      }).sort({ createdAt: -1 });

      return res.json({ success: true, tasks });
    }

    return res.status(403).json({ success: false, message: 'Invalid role' });
  } catch (err) {
    next(err);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { userId, title, description, dueDate, progress } = req.body;

    // ensure userId matches logged-in user
    if (!userId || userId !== id) {
      return res.status(403).json({ success: false, message: 'userId must match logged-in user' });
    }

    const task = new Task({ userId, title, description, dueDate, progress });
    await task.save();
    res.status(201).json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: 'Invalid task id' });

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    // only owner can update
    if (task.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Only task owner can update' });
    }

    const allowed = ['title','description','progress','dueDate'];
    allowed.forEach(field => {
      if (req.body[field] !== undefined) task[field] = req.body[field];
    });

    await task.save();
    res.json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: 'Invalid task id' });

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    if (task.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Only task owner can delete' });
    }

    // await task.remove();
    await task.deleteOne();

    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
