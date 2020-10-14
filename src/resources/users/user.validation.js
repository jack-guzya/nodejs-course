const Joi = require('joi');
const { RestError } = require('../../helpers/errors');

const schema = Joi.object({
  name: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required()
});

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
