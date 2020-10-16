const Joi = require('joi');
const { RestError } = require('../../utils/error-handler.js');

const schema = Joi.object({
  title: Joi.string().required(),
  order: Joi.number().required(),
  description: Joi.string().required()
});

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
