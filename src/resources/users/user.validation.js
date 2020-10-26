const Joi = require('joi');
const { rest } = require('../../errors');

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  login: Joi.string()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .min(5)
    .max(30)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).*$/m)
    .required()
});

const validate = async (req, res, next) => {
  try {
    const { name, login, password } = req.body;
    await schema.validateAsync({ name, login, password });

    return next();
  } catch (e) {
    return next(new rest.BadRequest(`Invalid user data. ${e.message}`));
  }
};

module.exports = { validate };
