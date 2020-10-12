const { RestError } = require('../../helpers/errors');

const isData = (name, login, password) => {
  if (name && login && password) {
    return;
  }

  throw new RestError(400, 'Bad request');
};

module.exports = { isData };
