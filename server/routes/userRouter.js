const db = require('../models/db');
const express = require('express');
const userController = require('../controllers/usersController');

const router = express.Router();

// router.get('/', (req, res) => {
//   console.log('made it here')
//   const text = `INSERT INTO comments(commentBody) VALUES($1) RETURNING *`
//   const values = ['sdfsadf']

//   // const text = 'SELECT * FROM people'

//   db.query(text, values)
//     .then((data) => {
//       console.log(data.rows)
//       res.json(data.rows)
//     })
//     .catch((err) => console.log(err));
// })
router.get('/', userController.getUsers, (req, res, next) => {
  res.send(200).json(res.locals)
});




module.exports = router;