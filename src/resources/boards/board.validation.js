const Joi = require('joi');
const { rest } = require('../../errors');

const schema = Joi.object({
  title: Joi.string().required(),
  columns: Joi.array()
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
