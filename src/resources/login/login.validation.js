const Joi = require('joi');
const { rest } = require('../../errors');

const schema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required()
});

const validate = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    await schema.validateAsync({ login, password });

    return next();
  } catch (e) {
    return next(new rest.BadRequest(`Invalid data. ${e.message}`));
  }
};

module.exports = { validate };
