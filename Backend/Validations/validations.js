const Joi = require("joi");

// let elements = Joi.object().keys({
//   element: Joi.string().required(),
// });
exports.recipeSchema = Joi.object({
  Name: Joi.string().required(),
  Description: Joi.string().required(),
  Ingredients: Joi.array().items(Joi.string()).required(),
  Steps: Joi.string().required(),
});
