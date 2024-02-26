const asyncHandler = require("express-async-handler");
const User = require("../Models/User");
const generateToken = require("../Config/generateToken");
const recipe = require("../Models/recipes");

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).send("Enter all fields");
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(200);
      throw new Error("User already exists");
    }

    const user = await User.create({
      email,
      password,
    });

    if (user) {
      res.status(200).send({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).send({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(401).send(error);
  }
});
///api/user?search=piyush
const allRecipes = asyncHandler(async (req, res) => {
  try {
    const recipes = await recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(401).send(error);
  }
});
const addRecipe = asyncHandler(async (req, res) => {
  const { title, description, ingredients, steps } = req.body; // Get recipe details from request body
  try {
    const newRecipe = await Recipe.create({
      title,
      description,
      ingredients,
      steps,
    });
    res.status(201).json(newRecipe); // Send newly created recipe as JSON response
  } catch (error) {
    res.status(400).json({ message: "Failed to add recipe" }); // Send error response
  }
});

// Edit recipe
const editRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params; // Get recipe ID from request params
  const { title, description, ingredients, steps } = req.body; // Get updated recipe details from request body
  try {
    const updatedRecipe = await recipe.findByIdAndUpdate(
      id,
      { title, description, ingredients, steps },
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" }); // If recipe with provided ID not found
    }
    res.status(200).json(updatedRecipe); // Send updated recipe as JSON response
  } catch (error) {
    res.status(400).json({ message: "Failed to update recipe" }); // Send error response
  }
});

const getRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const recipeOne = await recipe.findOne({ _id: id });
    return res.status(200).send(recipeOne);
  } catch (error) {
    return res.status(400).send(error);
  }
});

const searchRecipe = asyncHandler(async (req, res) => {
  const { keyword } = req.query;
  try {
    const recipes = await recipe.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } }, // Search by recipe title (case-insensitive)
        { ingredients: { $elemMatch: { $regex: searchTerm, $options: "i" } } }, // Search by ingredients (case-insensitive)
      ],
    });
    return res.status(200).send(recipes);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = {
  allRecipes,
  addRecipe,
  editRecipe,
  authUser,
  registerUser,
  getRecipe,
  searchRecipe,
};