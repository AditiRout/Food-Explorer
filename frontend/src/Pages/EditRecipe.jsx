import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: [],
    steps: "",
  });
  const [ingredientInputs, setIngredientInputs] = useState([""]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        };
        const response = await axios.get(
          `https://food-explorer-1.onrender.com/api/user/${id}`,
          config
        );
        const data = response.data;
        setFormData({
          name: data.name,
          description: data.description,
          ingredients: data.ingredients, // Assign ingredients directly as an array
          steps: data.steps,
        });
        setIngredientInputs(data.ingredients);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };

    fetchRecipeData();
  }, [id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const trimmedIngredients = ingredientInputs.filter(
    //   (ing) => ing.trim() !== ""
    // );
    setFormData({ ...formData, ingredients: ingredientInputs });
    console.log(ingredientInputs);
    const requestData = {
      name: formData.name,
      description: formData.description,
      steps: formData.steps,
      ingredients: ingredientInputs,
    };
    const user = JSON.parse(localStorage.getItem("userInfo"));
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      };
      console.log(requestData);
      const response = await axios.put(
        `https://food-explorer-1.onrender.com/api/user/${id}`,
        requestData,
        config
      );
      toast.success("Update Success!");
      navigate("/user/menu");
    } catch (error) {
      toast.error(error)
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
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
              <button
                type="button"
                onClick={() => handleDeleteIngredient(index)}
                className="ml-2 text-red-600 focus:outline-none"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredientInput}
            className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
          >
            Add Ingredient
          </button>
        </div>
        <div className="mb-2 flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
          >
            Save Changes
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
          >
            <Link
              to="/user/menu"
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
            >
              Cancel
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;
