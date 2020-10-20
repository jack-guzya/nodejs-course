const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const { INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST } = StatusCodes;

class RestError extends Error {
  constructor(status, ...message) {
    super(message.join(' '));

    this.statusCode = status;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = NOT_FOUND;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = BAD_REQUEST;
  }
}

// eslint-disable-next-line no-unused-vars
const handlerMiddleware = (err, req, res, next) => {
  const { statusCode, message } = err;

  const error = {
    status: 'error',
    statusCode: statusCode || INTERNAL_SERVER_ERROR,
    message: statusCode ? message : getReasonPhrase(INTERNAL_SERVER_ERROR)
  };

  res.status(error.statusCode).json(error);
};

const asyncHandleError = callback => async (req, res, next) => {
  try {
    return await callback(req, res, next);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  RestError,
  NotFoundError,
  BadRequestError,
  handle: handlerMiddleware,
  asyncHandleError
};
