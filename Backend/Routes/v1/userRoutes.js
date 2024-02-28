const express = require("express");
const router = express.Router();
const {
  registerUser,
  allRecipes,
  addRecipe,
  editRecipe,
  authUser,
  getRecipe,
  searchRecipe,
} = require("../../Controllers/userControllers.js");
const { protect } = require("../../Middlewares/authMiddleware.js");
const validateFunction = require("../../Middlewares/validationMiddleware.js");
const { recipeSchema } = require("../../Validations/validation.js");

router.route("/").post(registerUser);
router.route("/recipes").get(protect, allRecipes);
router.route("/search").get(protect, searchRecipe);
router.route("/login").post(authUser);
router
  .route("/add")
  .all(protect, validateFunction(recipeSchema))
  .post(addRecipe);
router.route("/:id").get(protect, getRecipe).put(protect, editRecipe);

module.exports = router;
