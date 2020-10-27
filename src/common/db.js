const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');
const logger = require('../logger');
const userService = require('../resources/users/user.service');

const admin = {
  name: 'admin',
  login: 'admin',
  password: 'admin'
};

const connect = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;

  db.on('error', e => logger.error(e));
  db.once('open', async () => {
    logger.info('Connection to the database was successful!');
    await db.dropDatabase();
    await userService.create(admin);
    callback();
  });
};

module.exports = { connect };
