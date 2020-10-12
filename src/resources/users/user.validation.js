const { RestError } = require('../../helpers/errors');
const validation = require('../../helpers/validation');

const isData = ({ name, login, password }) => {
  try {
    validation
      .isString(name, 'name')
      .isString(login, 'login')
      .isString(password, 'password');
  } catch (e) {
    throw new RestError(400, `Invalid user data. ${e.message}`);
  }
};

module.exports = { isData };
