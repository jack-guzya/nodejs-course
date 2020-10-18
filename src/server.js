const { PORT } = require('./common/config');
const db = require('./common/db');
const app = require('./app');
const logger = require('./utils/logger');

let server;

db.connect(() => {
  server = app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});

process
  .on('unhandledRejection', reason => {
    throw reason;
  })
  .on('uncaughtException', e => {
    logger.error(e);
    server && server.close();
    process.exitCode = 1;
  });
