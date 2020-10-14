const Joi = require('joi');
const { RestError } = require('../../helpers/errors');

const schema = Joi.object({
  title: Joi.string(),
  order: Joi.number(),
  description: Joi.string()
}).and('title', 'order', 'description');

const validate = async (req, res, next) => {
  try {
    const { title, order, description } = req.body;
    await schema.validateAsync({ title, order, description });
    return next();
  } catch (e) {
    return next(new RestError(400, `Invalid task data. ${e.message}`));
  }
};

module.exports = { validate };
