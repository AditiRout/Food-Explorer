import React from "react";
import { State } from "../Components/StoreProvider";

const Recipe = () => {
  const { selectedRecipe, setSelectedRecipe } = State();

  return <div>Recipe</div>;
};

export default Recipe;
