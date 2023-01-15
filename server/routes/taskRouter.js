const express = require('express');
const tasksController = require('../controllers/tasksController');

const router = express.Router();

//GET ALL TASKS
router.get('/', tasksController.getTasks, (req, res, next) => {
  res.status(200).json(res.locals.allTasks);
});
//GET ONE TASK ROUTE
router.get('/:id', tasksController.getTask, (req, res, next) => {
  res.status(200).json(res.locals.oneTask);
});
//CREATE ONE TASK ROUTE
router.post('/:id', tasksController.createTask, (req, res, next) => {
  res.status(200).json(res.locals.newUser)
});
//DELETE ONE TASK ROUTE
router.delete('/:id', userController.deleteTask, (req, res, next) => {
  res.status(200).json(res.locals)
});
//UPDATE ONE TASK ROUTE
router.patch('/:id', taskController.updateTask, (req, res, next) => {
  res.status(200).json(res.locals)
});

module.exports = router;

