const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');

const sessionConfig = require('../session/session-config');
const usersRouter = require('../users/users-router');

const server = express();

server.use(session(sessionConfig));
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api', usersRouter);

server.get('/', (req, res) => {
    res.send('Connected!');
});

module.exports = server;