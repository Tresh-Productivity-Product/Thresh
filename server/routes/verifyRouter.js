const db = require('../models/db');
const express = require('express');
const usersController = require('../controllers/usersController');


const router = express.Router();

// GET ALL USERS ROUTE
router.get('/', usersController.verifyID, (req, res, next) => {
  res.status(200).json('login sucess');
});



module.exports = router;