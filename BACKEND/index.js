const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
const { sequelize } = require('./database/models');

const authRouter = require('./routes/auth')
const todoRouter = require('./routes/todo')

//const UserController = require('./controllers/users');

// express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// check database connection
sequelize.authenticate().then(() => {
  console.log('Success connecting database');
});

app.use('/auth', authRouter)
app.use('/todo', todoRouter)


// app.post('/register', UserController.register);
// app.post('/login', UserController.login);

// handling error
app.use((error, req, res, next) => {
  return res.status(400).send({
    status: 'error',
    code: 400,
    message: 'Bad Request',
    error: error.message
  });
});

// run express
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// check database connection
// sequelize.authenticate().then(() => {
//   console.log('Success connecting database');
// });