const { PORT } = require('./common/config');
const logger = require('./logger');
const db = require('./common/db');
const app = require('./app');

db.connect(() => {
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});
