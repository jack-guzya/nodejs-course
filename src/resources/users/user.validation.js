const Joi = require('joi');
const { BadRequestError } = require('../../utils/error-handler.js');

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
    return next(new BadRequestError(`Invalid user data. ${e.message}`));
  }
};

module.exports = { validate };
