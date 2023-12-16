const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080', 'https://niromin.github.io'],
};

const usersRouter = require('./routes/users');
const scoreRouter = require('./routes/scores');
const authsRouter = require('./routes/auths');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', cors(corsOptions), usersRouter);
app.use('/scores', scoreRouter);
app.use('/auths', cors(corsOptions), authsRouter);

module.exports = app;
