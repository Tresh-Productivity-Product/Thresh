const { text } = require('express');
const db = require('../models/db');

const commentsController = {}

//Get all comments

commentsController.getComments = (req, res, next) => {
    const text = 'SELECT * FROM comments';
    db.query(text)
    .then(data => {
        res.locals.allComments = data
        return next();
    })
    .catch(err => {
        next({
          status: 400,
          log: 'Error in commentsController.getComments',
          message: {err: 'Error in commentsController.getComments'}
        })
      })
}

commentsController.getCommentsPerTask = (req, res, next) => {
    const { id } = req.query;
    const text = `SELECT * FROM comments WHERE tasks._id = ${id}`;

    db.query(text)
        .then(data => {
            [res.locals.specificComment] = data.rows;
            return next();
        })
        .catch(err => {
            next({
              status: 400,
              log: 'Error in commentsController.getCommentsPerTask',
              message: {err: 'Error in commentsController.getCommentsPerTask'}
            })
          })
        }

commentsController.deleteComments = (req, res, next) => {
    const { id } = req.query;
    const text = `DELETE FROM comments WHERE comments._id = ${id}`

    db.query(text)
        .then(data => {
            res.locals.deletedComments = data.rows;
            return next();
        })
        .catch(err => {
            next({
              status: 400,
              log: 'Error in commentsController.deleteComments',
              message: {err: 'Error in commentsController.deleteComments'}
            })
          })
}

commentsController.removeComment = (req, res, next) => {
    const { id } = req.query;
    const text = `DELETE FROM comments WHERE tasks._id = ${id}`

    db.query(text)
        .then(data => {
            res.locals.deletedTaskComment = data.rows;
            return next();
        })
        .catch(err => {
            next({
              status: 400,
              log: 'Error in commentsController.removeComment',
              message: {err: 'Error in commentsController.removeComment'}
            })
          })
}

commentsController.updateComment = (req, res, next) => {
    const { id } = req.query;
    const { newComment } = req.body
    const text = `UPDATE comments SET commentBody = ${newComment} WHERE comment._id = ${id}`;

    db.query(text)
        .then(data => {
            res.locals.updatedComment = data.rows;
            return next();
        })
        .catch(err => {
            next({
              status: 400,
              log: 'Error in commentsController.updateComment',
              message: {err: 'Error in commentsController.updateComment'}
            })
        })
}


commentsController.addComment = (req, res, next) => {
    const {
        user,
        user_id,
        date,
        commentBody
    } = req.body;

    const text = `INSERT INTO comments(_id, user, user_id, date, commentBody)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *`

    const values = [
        user,
        user_id,
        date,
        commentBody
    ];

    db.query(text, values)
        .then(data => {
            res.locals.newComment = data.rows;
            return next();
        })
        .catch(err => {
            next({
              status: 400,
              log: 'Error in commentsController.addComment',
              message: {err: 'Error in commentsController.addComment'}
            })
          })
}
module.exports = commentsController