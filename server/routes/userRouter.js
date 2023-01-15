const db = require('../models/db');
const express = require('express');
const userController = require('../controllers/usersController');

const router = express.Router();

// GET ALL USERS ROUTE
router.get('/', userController.getUsers, (req, res, next) => {
  res.status(200).json(res.locals.allUsers);
});
//GET ONE USER ROUTE
router.get('/:id', userController.getUser, (req, res, next) => {
  res.status(200).json(res.locals.oneUser);
});
//CREATE ONE USER ROUTE
router.post('/', userController.createUser, (req, res, next) => {
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

//CREATE USER ROUTER OPTION - RYLAN
router.post('/signup', 
  userController.getBcrypt,
  // userController.createUser, 
  (req, res, next) => {
    // console.log(req.body)
    res.status(200).json(res.locals.user);
  })


//SIGN IN ROUTER
router.post('/signin', 
userController.checkPass, 
(req, res, next) => {
  // console.log(req.body)
  res.status(200).json(res.locals.signin);
})
module.exports = router;