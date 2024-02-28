import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Recipe = () => {
  const [recipe, setRecipe] = useState();
  const { id } = useParams();
  useEffect(() => {
    const fetchRecipe = async () => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get(
          `http://localhost:5000/api/user/${id}`,
          config
        );
        const data = response.data;
        setRecipe(data); // Assuming the response contains the details of the selected recipe
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    ); // Placeholder for loading state
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      <p className="text-gray-700 mb-4">{recipe.description}</p>

      <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="text-gray-700">
            {ingredient}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Steps:</h2>
      <ol className="list-decimal list-inside">
        {recipe.steps.split(".").map(
          (step, index) =>
            step && (
              <li key={index} className="text-gray-700">
                {step}
              </li>
            )
        )}
      </ol>
    </div>
  );
};

export default Recipe;
