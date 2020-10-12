const { RestError } = require('../../helpers/errors');

const isTitle = title => {
  if (typeof title !== 'string') {
    throw new Error('The title should be a string type');
  }
};

const isOrder = order => {
  if (typeof order !== 'number') {
    throw new Error('The order should be a number type');
  }
};

const isColumns = columns => {
  if (!Array.isArray(columns)) {
    throw new Error('Columns should be an array');
  }
};

const isColumnsData = columns => {
  try {
    columns.length &&
      columns.forEach(({ title, order }) => {
        isTitle(title);
        isOrder(order);
      });
  } catch (e) {
    throw new RestError(400, `Invalid column data. ${e.message}`);
  }
};

const isData = (title, columns) => {
  try {
    isTitle(title);
    isColumns(columns);
  } catch (e) {
    throw new RestError(400, `Invalid board data. ${e.message}`);
  }
};

module.exports = { isColumnsData, isData };
