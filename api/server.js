const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

const usersRouter = require('../users/users-router');

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api', usersRouter);

server.get('/', (req, res) => {
    res.send('Connected!');
});

module.exports = server;