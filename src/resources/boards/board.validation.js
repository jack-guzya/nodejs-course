const Joi = require('joi');
const { rest } = require('../../errors');

const columnSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string()
    .min(3)
    .max(30),
  order: Joi.number()
    .min(0)
    .integer()
});

const schema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .required(),
  columns: Joi.array().items(columnSchema)
});

const validate = async (req, res, next) => {
  try {
    const { title, columns = [] } = req.body;
    await schema.validateAsync({ title, columns });

    return next();
  } catch (e) {
    return next(new rest.BadRequest(`Invalid board data. ${e.message}`));
  }
};

module.exports = { validate };
