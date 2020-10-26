const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const { INTERNAL_SERVER_ERROR } = StatusCodes;
const restErrors = require('./rest-errors');

// eslint-disable-next-line no-unused-vars
const handle = (err, req, res, next) => {
  const { statusCode, message } = err;

  const error = {
    status: 'error',
    statusCode: statusCode || INTERNAL_SERVER_ERROR,
    message: statusCode ? message : getReasonPhrase(INTERNAL_SERVER_ERROR)
  };

  res.status(error.statusCode).json(error);
};

const wrapper = callback => async (req, res, next) => {
  try {
    return await callback(req, res, next);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  rest: restErrors,
  handle,
  wrapper
};
