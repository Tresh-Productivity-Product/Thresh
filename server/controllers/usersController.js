const { data } = require('autoprefixer');
const db = require('../models/db');
const usersController = {};

//GET ALL USERS CONTROLLER
usersController.getUsers = (req, res, next) => {
    const text = 'SELECT * FROM users;'
    db.query(text)
    .then(data => {
       // console.log('DATA: ', data);
        console.log('DATA.ROWS: ', data.rows);
        res.locals.allUsers = data.rows
        return next()
    })
}
//GET ONE USER CONTROLLER
usersController.getUser = (req, res, next) => {
    const id = req.params.id
    const text = `SELECT * FROM users WHERE _id = ${id};`
    console.log(id);
    console.log(text);
    db.query(text)
    .then(data => {
        console.log('DATA ', data.rows)
        res.locals.oneUser = data.rows
        return next()
    })
}
//CREATE ONE USER CONTROLLER
usersController.createUser = (req,res,next) => {
    console.log(req.body)
     const { _id, firstName, lastName, password, userRole, email } = req.body
    const text = `INSERT INTO users ( _id, firstName, lastName, password, userRole, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
    const values = [ _id, firstName, lastName, password, userRole, email]
    db.query(text, values)
    .then(data => {
        //console.log(data.rows)
        res.locals.newUser = data.rows
        return next()
    })
}
//DELETE ONE USER CONTROLLER
usersController.deleteUser = (req,res,next) => {
    const id = req.params.id
    const text = `DELETE FROM users WHERE _id = ${id};`

    db.query(text)
    .then(data => {
        console.log('User with id: ${id}deleted'+ data.rows)
        res.locals.deleteUser = data.rows
        return next()
    })
}

//UPDATE ONE USER CONTROLLER ---> not working yet
usersController.updateUser = (req,res,next) => {
    console.log(req.body)
     const { firstName, lastName, password, userRole, email } = req.body
    const text = `UPDATE users SET firstName = $1, lastName = $2, password = $3, userRole = $4, email=$5`
    const values = [  firstName, lastName, password, userRole, email]
    db.query(text, values)
    .then(data => {
        console.log(data.rows)
        res.locals.newUser = data.rows
        return next()
    })
}


module.exports = usersController;