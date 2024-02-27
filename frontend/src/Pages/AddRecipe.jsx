import React, { useState } from "react";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: [],
    steps: ""
  });
  const [ingredientInputs, setIngredientInputs] = useState([""]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredientInputs];
    updatedIngredients[index] = value;
    setIngredientInputs(updatedIngredients);
  };

  const handleAddIngredientInput = () => {
    setIngredientInputs([...ingredientInputs, ""]);
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = [...ingredientInputs];
    updatedIngredients.splice(index, 1);
    setIngredientInputs(updatedIngredients);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedIngredients = ingredientInputs.filter((ing) => ing.trim() !== "");
    setFormData({ ...formData, ingredients: trimmedIngredients });
    console.log(formData); // Replace with your submission logic
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="description"
            placeholder="Description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <textarea
            name="steps"
            placeholder="Steps"
            rows={4}
            value={formData.steps}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
          {ingredientInputs.map((input, index) => (
            <div key={index} className="mb-2 flex items-center">
              <input
                type="text"
                placeholder={`Ingredient ${index + 1}`}
                value={input}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                required
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:border-indigo-500"
              />
              <button type="button" onClick={() => handleDeleteIngredient(index)} className="ml-2 text-red-600 focus:outline-none">
                X
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddIngredientInput} className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none">
            Add Ingredient
          </button>
        </div>
        <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
