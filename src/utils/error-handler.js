class RestError extends Error {
  constructor(status, ...message) {
    super(message.join(' '));

    this.statusCode = status;
  }
}

// eslint-disable-next-line no-unused-vars
const handlerMiddleware = (err, req, res, next) => {
  const { statusCode, message } = err;

  const error = {
    status: 'error',
    statusCode: statusCode || 500,
    message: statusCode ? message : 'Internal Server Error!'
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
  handle: handlerMiddleware,
  asyncHandleError
};
