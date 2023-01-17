const db = require('../models/db');
const express = require('express');
const userController = require('../controllers/usersController');

const router = express.Router();

// GET ALL USERS ROUTE
router.get('/', userController.getUsers, (req, res, next) => {
  res.status(200).json(res.locals.allUsers);
});

router.post('/login', userController.getUser, (req, res, next) => {
  res.status(200).json(res.locals.oneUser);
  // res.redirect(302, '/api/dashboard')
});
//CREATE ONE USER ROUTE
router.post('/signup', userController.getBcrypt, userController.createUser, (req, res, next) => {
  res.status(200).json(res.locals.newUser)
});
//DELETE ONE USER ROUTE
router.delete('/:id', userController.deleteUser, (req, res, next) => {
  res.status(200).json(res.locals.deleteUser)
});
//UPDATE ONE USER ROUTE
router.patch('/:id', userController.updateUser, (req, res, next) => {
  res.status(200).json(res.locals.newUser)
});



module.exports = router;