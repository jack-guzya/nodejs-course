const { RestError } = require('../../helpers/errors');
const validation = require('../../helpers/validation');

const isData = ({ title, order, description }) => {
  try {
    validation
      .isString(title, 'title')
      .isNumber(order, 'order')
      .isString(description, 'description');
  } catch (e) {
    throw new RestError(400, `Invalid task data. ${e.message}`);
  }
};

module.exports = { isData };
