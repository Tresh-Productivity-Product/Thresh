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
    // console.log('req body: ', req.body)
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
usersController.getUser = async (req, res, next) => {
    const { email, password } = req.body;

    const text = `SELECT * FROM users WHERE email = $1`
    const values = [email]

    try {
        // postgreSQL is a asynchronous by default - ignore vscode await error
        const response = await db.query(text, values);
        // storing input into res.locals.oneUser, response.rows is an array with one object
        res.locals.oneUser = response.rows[0];
        const databasePw = res.locals.oneUser.password;
        
        // use bcrypt.compare to check password
        // verified = true if bcrypt.compare is successful
        const verified = await bcrypt.compare(password, databasePw);
        if (verified) {
            // res.redirect(303)
            return next();
        }
        else return res.status(400).json({ msg: 'Invalid credentials' });
    } catch (err) {
        console.log(err)
    }
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

usersController.verifyUser = (req, res, next) => {
    const { id } = req.params.id;
    const { email, password } = req.body;
    const text = `SELECT * from user WHERE ID = ${id} `
    db.query(text)
        .then(data => {
            
        })
}
}




module.exports = usersController;