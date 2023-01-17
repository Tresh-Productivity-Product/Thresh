const { text } = require('express');
const db = require('../models/db');

const commentsController = {}

//Get all comments

commentsController.getComments = (req, res, next) => {
    const text = 'SELECT * FROM comment';
    db.query(text)
    .then(data => {
        res.locals.allComments = data.rows
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
    //const { id } = req.query;
    const  id = req.params.id
    const text = `SELECT * FROM comment WHERE tasks._id = ${id}`;

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
    const  id  = req.params.id;
    const text = `DELETE FROM comment WHERE _id = ${id}`

    db.query(text)
        .then(data => {
            res.locals.deletedComments = data.rows;
            return next();
        })
        .catch(err => {
          console.log(err)
            next({
              status: 400,
              log: 'Error in commentsController.deleteComments',
              message: {err: 'Error in commentsController.deleteComments'}
            })
          })
}

commentsController.removeComment = (req, res, next) => {
    const { id } = req.query;
    const text = `DELETE FROM comment WHERE tasks._id = ${id}`

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
    const id = req.params.id
    const  { commentBody }  = req.body
    console.log('commentBody' + commentBody)
    const text = `UPDATE comment 
    SET  commentBody = '${commentBody}'
    WHERE id = ${id};`

    db.query(text)
        .then(data => {
          console.log('DATA', data.rows)
            res.locals.updatedComment = data.rows;
            return next();
        })
        .catch(err => {
          //console.log(err)
            next({
              status: 400,
              log: 'Error in commentsController.updateComment',
              message: {err: 'Error in commentsController.updateComment'}
            })
        })
}


commentsController.addComment = (req, res, next) => {
    const {
        id,
        user_id,
        date,
        commentBody
    } = req.body;

    const text = `INSERT INTO comment(id, user_id, date, commentBody)
    VALUES($1, $2, $3, $4)
    RETURNING *`;

    const values = [
        id,
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
            console.log(err),
            next({
              status: 400,
              log: 'Error in commentsController.addComment',
              message: {err: 'Error in commentsController.addComment', }
            })
          })
}
module.exports = commentsController