import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "../Components/SearchBar";

const MainMenu = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (query) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `http://localhost:5000/api/user/search?searchTerm=${query}`,
        config
      );
      setRecipes(response.data);
    } catch (err) {
      setError(err.response.data.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipes = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:5000/api/user/recipes",
        config
      );
      setRecipes(response.data);
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 p-4">All Recipes</h1>
        <div className=" container flex justify-center mb-8 p-4">
          <SearchBar onSearch={handleSearch} loading={loading} error={error} />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="relative mx-auto max-w-full md:max-w-md min-w-40 w-80 h-30 rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg overflow-hidden"
            >
              <div className="bg-white p-7 rounded-md">
                <h2 className="font-bold text-xl mb-2 text-cyan-800">
                  {recipe.name}
                </h2>
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/user/menu/${recipe._id}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    View Recipe
                  </Link>
                  <Link
                    to={`/user/edit/${recipe._id}`} // Assuming the route for editing a recipe is "/edit/:id"
                    className="text-gray-600 hover:text-gray-800 font-semibold"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
