const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const loginRouter = require('./resources/login/login.router');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const error = require('./errors');
const logger = require('./logger').middleware;
const token = require('./token');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logger.request);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    return;
  }
  next();
});

app.use('/login', loginRouter);

app.use('/users', token.check, userRouter);

app.use('/boards', token.check, boardRouter);

boardRouter.use('/:boardId/tasks', token.check, taskRouter);

app.use(logger.serverError, logger.clientError);

app.use(error.handle);

module.exports = app;
