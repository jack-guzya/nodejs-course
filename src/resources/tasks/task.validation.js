const Joi = require('joi');
const { rest } = require('../../errors');

const schema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .required(),
  order: Joi.number()
    .min(0)
    .integer()
    .required(),
  description: Joi.string()
});

const validate = async (req, res, next) => {
  try {
    const { title, order, description } = req.body;
    await schema.validateAsync({ title, order, description });

    return next();
  } catch (e) {
    return next(new rest.BadRequest(`Invalid task data. ${e.message}`));
  }
};

module.exports = { validate };
