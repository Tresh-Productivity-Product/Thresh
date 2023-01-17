const express = require('express');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

//get all comments
router.get('/all', commentsController.getComments, (req, res)  => {
    res.status(200).json(res.locals.allComments);
})
//get all comments for individual task
router.get('/:id', commentsController.getCommentsPerTask, (req, res)  => {
    res.status(200).json(res.locals.specificComment);
})
//post a comment
router.post('/', commentsController.addComment, (req, res)  => {
    res.status(200).json(res.locals.newComment);
})
//delete all comments (may not need)
// router.delete('/:id', commentsController.deleteComments, (req, res)  => {
//     res.status(200).json(res.locals.deletedComments);
// })
//remove comment from task
router.delete('/:id', commentsController.deleteComments, (req, res)  => {
    res.status(200).json(res.locals.deletedComments);
})
//update specific comment
router.patch('/:id', commentsController.updateComment, (req, res)  => {
    res.status(201).json(res.locals.updatedComment);
})
module.exports = router;

