const { StatusCodes } = require('http-status-codes');
const { NOT_FOUND, BAD_REQUEST, FORBIDDEN } = StatusCodes;

class NotFound extends Error {
  constructor(message) {
    super(message);

    this.statusCode = NOT_FOUND;
  }
}

class BadRequest extends Error {
  constructor(message) {
    super(message);

    this.statusCode = BAD_REQUEST;
  }
}

class Forbidden extends Error {
  constructor(message) {
    super(message);

    this.statusCode = FORBIDDEN;
  }
}

module.exports = { NotFound, BadRequest, Forbidden };
