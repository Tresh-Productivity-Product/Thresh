const { data } = require('autoprefixer');
const db = require('../models/db');
const bcrypt = require('bcrypt')
const usersController = {};
const WORKFACTOR = 15;
// EXAMPLE:
// {
//     "fistName": "fname",
//     "lastName": "lname",
//     "password": "pass123",
//     "userRole": "role",
//     "email": "email"
// }

//CRYPT USER PASSWORD
usersController.getBcrypt = (req, res, next) => {
    console.log('req body: ', req.body)
    //temp
    const pass = req.body.password;
    bcrypt.hash(pass, WORKFACTOR)
        .then(hash => {
            req.body.password = hash;
            // console.log(('hash is: ', hash))
            res.locals.user = req.body;
            console.log('response:', res.locals.user);
            return next();
        })
}

usersController.checkPass = (req, res, next) => {
    //logic to get DB user password by email
    //store hashed pass in 'hash'

    // console.log('req body: ', req.body)
    // let otherPass = 'qwerty1234'; //check
    const pass = req.body.password;
    const hash = 'db result'
    // const pass2 = req.body.pass2
    bcrypt.compare(pass, pass2)
        .then(result => {
            console.log('result: ', result)
            res.locals.signin = result; //true if success
            return next();
        })
}

// usersController.createUser = (req, res, next) => {
//     // console.log(req.body)
//     next()
// }

// const createUser = (req, res) => {
//   const { firstName, lastName, password, userRole,email, commentId } = request.body

//   pool.query('INSERT INTO users (firstName, lastName, password, userRole, email, commentId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [firstName, lastName, password, userRole, email, commentId], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).send(`User added with ID: ${results.rows[0].id}`)
//   })
// }



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
    const text = `INSERT INTO users (_id, firstName, lastName, password, userRole, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
    const values = [ _id, firstName, lastName, password, userRole, email]
    db.query(text, values)
    .then(data => {
        console.log(data.rows)
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
     const { _id, firstName, lastName, password, userRole, email } = req.body
    const text = `UPDATE users SET _id = $1, firstName = $2, lastName = $3, password = $4, userRole = $5, email=$6`
    const values = [ _id, firstName, lastName, password, userRole, email]
    db.query(text, values)
    .then(data => {
        console.log(data.rows)
        res.locals.newUser = data.rows
        return next()
    })
}


module.exports = usersController;