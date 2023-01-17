// const { io } = require('socket.io-client');
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
  const id = req.params.id //set ID primary key in table
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
    title,
    text,
    // create_date,
    // comment_id
  } = req.body
  
  // console.log(req.body);

  const query = `INSERT INTO task (title, text)
    VALUES($1, $2)
    RETURNING *`;

  const values = [
    title,
    text
    // create_date
  ]

  db.query(query, values)
    .then(data => {
      console.log('data:', data.rows[0])
      res.locals.newTask = data.rows[0]
      // io.emit('newTodo', data.rows[0])
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
  const { id } = req.query //set ID primary key in table
  const text = `DELETE FROM task WHERE task.ID = ${id}`

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
  const { id } = req.query; //set ID primary key in table
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