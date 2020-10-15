class RestError extends Error {
  constructor(status, ...message) {
    super(message.join(' '));

    this.statusCode = status;
  }
}

const handleError = (err, req, res, next) => {
  const { statusCode, message } = err;

  const error = {
    status: 'error',
    statusCode: statusCode || 500,
    message: statusCode ? message : 'Internal Server Error!'
  };

  next(error);
};

// eslint-disable-next-line no-unused-vars
const sendError = (err, req, res, next) => res.status(err.statusCode).json(err);

const asyncHandleError = callback => async (req, res, next) => {
  try {
    return await callback(req, res, next);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  RestError,
  handleError,
  sendError,
  asyncHandleError
};
