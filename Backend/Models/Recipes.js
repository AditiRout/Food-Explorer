const mongo = require("mongoose");

const RecipeModel = mongo.Schema(
  {
    name: { type: String, trim: true },
    description: { type: String, default: false },
    ingredients: [
      {
        type: String,
      },
    ],
    steps: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const recipe = mongo.model("recipe", RecipeModel);
module.exports = recipe;
