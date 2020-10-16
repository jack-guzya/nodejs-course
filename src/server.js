const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./utils/logger');

const server = app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

process
  .on('unhandledRejection', e => {
    throw e;
  })
  .on('uncaughtException', e => {
    logger.error(logger.formatError(e));
    server.close();
  });
