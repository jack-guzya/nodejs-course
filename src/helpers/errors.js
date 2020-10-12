class RestError extends Error {
  constructor(status, message) {
    super(message);

    this.statusCode = status;
  }
}

// eslint-disable-next-line no-unused-vars
const handleMiddlewareError = (err, req, res, next) => {
  const { statusCode, message } = err;

  res.status(statusCode || 500).json({
    status: 'error',
    statusCode: statusCode || 500,
    message: statusCode ? message : 'Internal Server Error!'
  });
};

const asyncHandleError = callback => async (req, res, next) => {
  try {
    return await callback(req, res, next);
  } catch (e) {
    return next(e);
  }
};

module.exports = { RestError, handleMiddlewareError, asyncHandleError };
