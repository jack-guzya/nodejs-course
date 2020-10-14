const Joi = require('joi');
const { RestError } = require('../../helpers/errors');

const schema = Joi.object({
  name: Joi.string(),
  login: Joi.string(),
  password: Joi.string()
}).and('name', 'login', 'password');

const validate = async (req, res, next) => {
  try {
    const { name, login, password } = req.body;
    await schema.validateAsync({ name, login, password });
    return next();
  } catch (e) {
    return next(new RestError(400, `Invalid user data. ${e.message}`));
  }
};

module.exports = { validate };
