const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./utils/logger');

const server = app.listen(PORT, () =>
  logger.info(`App is running on http://localhost:${PORT}`)
);

process
  .on('unhandledRejection', reason => {
    throw reason;
  })
  .on('uncaughtException', e => {
    logger.error(e);
    server.close();
    process.exitCode = 1;
  });
