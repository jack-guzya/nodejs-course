const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
// Routers
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
// Utils
const error = require('./utils/error-handler.js');
const logger = require('./utils/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logger.log);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    return;
  }
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use(logger.logServerError, logger.logClientError);

app.use(error.handle);

module.exports = app;
