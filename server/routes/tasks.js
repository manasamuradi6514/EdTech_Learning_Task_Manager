const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { taskCreateValidator, handleValidationErrors } = require('../middleware/validators');

router.use(auth); // all task routes need auth

router.get('/', getTasks);
router.post('/', taskCreateValidator, handleValidationErrors, createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
