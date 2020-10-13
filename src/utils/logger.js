const morgan = require('morgan');

const isEmpty = obj => typeof obj === 'object' && !Object.entries(obj).length;

morgan.token('body', req =>
  isEmpty(req.body) ? '-' : JSON.stringify(req.body)
);

const logger = morgan(':method :url :body :status');

module.exports = logger;
