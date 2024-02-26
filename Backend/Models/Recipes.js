const mongo = require("mongoose");

const RecipeModel = mongo.Schema(
  {
    Name: { type: String, trim: true },
    Description: { type: Boolean, default: false },
    Ingredients: [
      {
        type: String,
      },
    ],
    Steps: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const recipe = mongo.model("recipe", RecipeModel);
module.exports = recipe;
