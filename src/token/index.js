const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { rest } = require('../errors');

const get = payload => jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '4h' });

const getFromBearerScheme = string => string.replace(/^Bearer\s*/g, '');

const check = async (req, res, next) => {
  try {
    const token = getFromBearerScheme(req.headers.authorization);
    await jwt.verify(token, JWT_SECRET_KEY);

    return next();
  } catch (e) {
    return next(new rest.Unauthorized('Access token is missing or invalid'));
  }
};

module.exports = { get, check };
