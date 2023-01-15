const db = require('../models/db');

const tasksController = {};


//GET ALL TASKS CONTROLLER
tasksController.getTasks = (req, res, next) => {
  const text = 'SELECT * FROM task;'
    db.query(text)
    .then(data => {
       // console.log('DATA: ', data);
        console.log('DATA.ROWS: ', data.rows);
        res.locals.allTasks = data.rows
        return next()
    })

}
//GET ONE TASK CONTROLLER
tasksController.getTask = (req, res, next) => {
  const id = req.params.id
    const text = `SELECT * FROM task WHERE _id = ${id};`
    db.query(text)
    .then(data => {
        console.log('DATA ', data.rows)
        res.locals.oneTask = data.rows
        return next()
    })

}
//CREATE ONE TASK CONTROLLER
tasksController.createTask = (req,res,next) => {
  
}
//DELETE ONE TASK CONTROLLER
tasksController.deleteTask = (req,res,next) => {
  
}

//UPDATE ONE TASK CONTROLLER ---> not working yet
tasksController.updateTask = (req,res,next) => {
  
}

module.exports = tasksController