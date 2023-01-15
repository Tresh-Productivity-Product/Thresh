const express = require('express');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

//get all comments
router.get('/', commentsController.getComments, (req, res)  => {
    res.status(200).json(res.locals.allComments);
})
//get all comments for individual task
router.get('/:id', commentsController.getCommentsPerTask, (req, res)  => {
    res.status(200).json(res.locals.specificComment);
})
//delete all comments (may not need)
router.delete('/:id', commentsController.deleteComments, (req, res)  => {
    res.status(200).json(res.locals.deletedComments);
})
//remove comment from task
router.delete('/:id', commentsController.removeComment, (req, res)  => {
    res.status(200).json(res.locals.deletedTaskComment);
})
//update specific comment (not sure if correct)
router.patch('/:id', commentsController.removeComment, (req, res)  => {
    res.status(200).json(res.locals.updatedComment);
})
module.exports = router;

