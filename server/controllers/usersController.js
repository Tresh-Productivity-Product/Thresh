const db = require('../models/db');
const usersController = {};

// const createUser = (req, res) => {
//   const { firstName, lastName, password, userRole,email, commentId } = request.body

//   pool.query('INSERT INTO users (firstName, lastName, password, userRole, email, commentId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [firstName, lastName, password, userRole, email, commentId], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).send(`User added with ID: ${results.rows[0].id}`)
//   })
// }

// usersController.getUsers = (req, res, next) => {
//     const text = 'SELECT * FROM users;'
//     db.query(text, (err, results) => {
//         if (err) console.log('userController GET USER err: ', err);
//         console.log('DATA: ', results)
//         // console.log('DATA ROWS: ', results.rows)
//         res.status(200).json(results);
//     })
usersController.getUsers = (req, res, next) => {
    const text = 'SELECT * FROM users;'
    db.query(text)
    .then(data => {
        console.log('DATA: ', data);
        console.log('DATA.ROWS: ', data.rows);
        return next()
    })
}

module.exports = usersController;