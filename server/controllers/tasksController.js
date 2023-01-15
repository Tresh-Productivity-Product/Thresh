const db = require('../models/db');

const tasksController = {};


//GET ALL TASKS CONTROLLER
tasksController.getTasks = (req, res, next) => {
  const text = 'SELECT * FROM task';
    db.query(text)
    .then(data => {
       // console.log('DATA: ', data);
        console.log('DATA.ROWS: ', data.rows);
        res.locals.allTasks = data.rows
        return next()
    })
    .catch(err => {
      next({
        status: 400,
        log: 'Error in taskController.getTasks',
        message: {err: 'Error in taskController.getTasks'}
      })
    })

}
//GET ONE TASK CONTROLLER
tasksController.getTask = (req, res, next) => {
  const id = req.params.id
    const text = `SELECT * FROM task WHERE _id = ${id}`;
    db.query(text)
    .then(data => {
        console.log('DATA ', data.rows)
        res.locals.oneTask = data.rows
        return next()
    })
    .catch(err => {
      next({
        status: 400,
        log: 'Error in taskController.getTask',
        message: {err: 'Error in taskController.getTask'}
      })
    })

}
//CREATE ONE TASK CONTROLLER
tasksController.createTask = (req,res,next) => {
  
  const {
    taskTitle,
    taskDetail,
    dateCreated,
    doing,
    done,
    comment_id
  } = req.body

  const text = `INSERT INTO task (taskTitle, taskDetail, dateCreated, doing, done, comment_id)
  VALUES($1, $2, $3, $4, $5, $6)
  RETURNING *`;

  const values = [
    taskTitle,
    taskDetail,
    dateCreated,
    doing,
    done,
    comment_id
  ]

  db.query(text, values)
    .then(data => {
      res.locals.newTask = rows.data;
      return next();
    })
    .catch(err => {
      next({
        status: 400,
        log: 'Error in taskController.createTask',
        message: {err: 'Error in taskController.createTask'}
      })
    })
}
//DELETE ONE TASK CONTROLLER
tasksController.deleteTask = (req,res,next) => {
  const { id } = req.query
  const text = `DELETE FROM task WHERE task._id = ${id}`

  db.query(text) 
    .then(data => {
      res.locals.deletedTask = data.rows;
      return next();
    })
    .catch(err => {
      next({
        status: 400,
        log: 'Error in taskController.deleteTask',
        message: {err: 'Error in taskController.deleteTask'}
      })
    })
}

//UPDATE ONE TASK CONTROLLER ---> not working yet
tasksController.updateTask = (req,res,next) => {
  const { id } = req.query;
  const { newUpdate, newTaskDetail, newDateCreated, newDoing, newDone } = req.body;

  const text = `UPDATE task SET taskTitle = ${newUpdate}, taskDetail = ${newTaskDetail}, dateCreated = ${newDateCreated}, doing= ${newDoing}, done= ${newDone} WHERE task._id = ${id}`;

  db.query(text)
    .then(data => {
      res.locals.updatedTask = data.rows;
      return next()
    })
    .catch(err => {
      next({
        status: 400,
        log: 'Error in taskController.updateTask',
        message: {err: 'Error in taskController.updateTask'}
      })
    })
}

module.exports = tasksController