const Joi = require('joi');
const { RestError } = require('../../utils/error-handler.js');

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
    return next(new RestError(400, `Invalid board data. ${e.message}`));
  }
};

module.exports = { validate };
