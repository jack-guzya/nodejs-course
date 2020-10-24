const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');
const logger = require('../utils/logger');

const connect = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;

  db.on('error', e => logger.error(e));
  db.once('open', () => {
    logger.info('Connection to the database was successful!');
    db.dropDatabase();
    callback();
  });
};

module.exports = { connect };
