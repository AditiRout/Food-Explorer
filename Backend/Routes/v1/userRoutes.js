const express = require("express");
const router = express.Router();
const {
  registerUser,
  allRecipes,
  addRecipe,
  editRecipe,
  authUser,
  getRecipe,
} = require("../../Controllers/userControllers.js");
const { protect } = require("../../Middlewares/authMiddleware.js");
const validateFunction = require("../../Middlewares/validationMiddleware.js");
const { recipeSchema } = require("../../Validations/validations.js");

router.route("/").post(registerUser).get(protect, allRecipes);
router.route("/login").post(authUser);
router
  .route("/add")
  .all(protect, validateFunction(recipeSchema))
  .post(addRecipe);
router.route("/:id").get(protect, getRecipe).put(protect, editRecipe);

module.exports = router;
