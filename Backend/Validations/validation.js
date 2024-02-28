const Joi = require("joi");

exports.recipeSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  ingredients: Joi.array().items(Joi.string()).required(),
  steps: Joi.string().required(),
});
