const db = require('../models/db');
const express = require('express');
const userController = require('../controllers/usersController');

const router = express.Router();



router.get('/', userController.getUsers, (req, res, next) => {
  res.send(200).json(res.locals)
});

router.post('/signup', 
  userController.getBcrypt,
  // userController.createUser, 
  (req, res, next) => {
    // console.log(req.body)
    res.status(200).json(res.locals.user);
  })

  router.post('/signin', 
  userController.checkPass, 
  (req, res, next) => {
    console.log(req.body)
    res.status(200).json(res.locals.signin);
  })




module.exports = router;