const { data } = require('autoprefixer');
const db = require('../models/db');
const usersController = {};
const bcrypt = require('bcrypt')
const WORKFACTOR = 15;

// EXAMPLE DATA:
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
            // console.log('response:', res.locals.user);
            return next();
        })
}

//CHECK USER PASSWORD
usersController.checkPass = (req, res, next) => {
    //logic to get DB user password by email
    //store hashed pass in 'hash'
    // console.log('req body: ', req.body)
    const pass = req.body.password;
    const hash = 'db result'
    bcrypt.compare(pass, pass2)
        .then(result => {
            // console.log('result: ', result)
            res.locals.signin = result; //true if success
            return next();
        })
}



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
    // console.log(req.body)
    // const email  = req.params.email
    // const email  = req.body.email;
    //console.log(req.query)
    const { email } = req.query
    console.log(email)
    const text = `SELECT * FROM users WHERE email = '${email}'`
    //console.log(email);
    //console.log(text);
    db.query(text)
    .then(data => {
        console.log('DATA ', data.rows)
        res.locals.oneUser = data.rows
        return next()
    })
    .catch(err => {
        //console.log(err)
          next({
            status: 400,
            log: 'Error in usersController.getUser',
            message: {err: 'Error in usersController.getUser'}
          })
      })
}
//CREATE ONE USER CONTROLLER
usersController.createUser = (req,res,next) => {

    // INSERT INTO users ( firstName,lastName, password, userRole, email) VALUES ( 'Roberto', 'Meloni', '1234', 'backend', 'myessmail@google');
    console.log(req.body)
     const { firstName, lastName, password, userRole, email } = req.body
    const text = `INSERT INTO users (firstName, lastName, password, userRole, email) VALUES ($1, $2, $3, $4, $5) RETURNING *;`
    const values = [ firstName, lastName, password, userRole, email]
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
     const { firstName, lastName, password, userRole, email } = req.body
    const text = `UPDATE users SET firstName = $1, lastName = $2, password = $3, userRole = $4, email=$5`
    const values = [ firstName, lastName, password, userRole, email]
    db.query(text, values)
    .then(data => {
        console.log(data.rows)
        res.locals.newUser = data.rows
        return next()
    })
}




module.exports = usersController;