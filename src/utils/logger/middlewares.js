const helper = require('./helpers');

const serverError = logger => (err, req, res, next) => {
  if (err.statusCode) {
    return next(err);
  }

  logger(`${req.method} ${req.url}\n${helper.formatError(err)}\n`);

  next(err);
};

const clientError = logger => (err, req, res, next) => {
  if (!err.statusCode) {
    return next(err);
  }

  const { statusCode, message } = err;
  logger(`${req.method} ${statusCode}\nUrl: ${req.url}\n${message}\n`);

  next(err);
};

module.exports = { serverError, clientError };
