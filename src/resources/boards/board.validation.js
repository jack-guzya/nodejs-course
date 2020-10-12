const { RestError } = require('../../helpers/errors');
const validation = require('../../helpers/validation');

const isData = ({ title, columns = [] }) => {
  try {
    validation.isString(title, 'title').isArray(columns, 'columns');
  } catch (e) {
    throw new RestError(400, `Invalid board data. ${e.message}`);
  }
};

module.exports = { isData };
