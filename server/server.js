const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const PORT = 3000;
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');
const commentRouter = require('./routes/commentRouter');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// ROUTE HANDLER
app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/comments', commentRouter);

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

<<<<<<< HEAD
// client.connect(process.env.PG_URI)
//   .then(() => {
// console.log('starting on port 3000' );
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
}); //log conected to port
=======

app.listen(PORT , () => { console.log(`Listening on port ${PORT}...`); }); //log conected to port
>>>>>>> dev

module.exports = app;
