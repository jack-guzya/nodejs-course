const { StatusCodes } = require('http-status-codes');
const { NOT_FOUND, BAD_REQUEST, FORBIDDEN, UNAUTHORIZED } = StatusCodes;

const createRestError = statusCode =>
  class extends Error {
    constructor(message) {
      super(message);

      this.statusCode = statusCode;
    }
  };

module.exports = {
  NotFound: createRestError(NOT_FOUND),
  BadRequest: createRestError(BAD_REQUEST),
  Forbidden: createRestError(FORBIDDEN),
  Unauthorized: createRestError(UNAUTHORIZED)
};
