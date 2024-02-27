import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    // Perform logout logic here
    // For example, clear localStorage and navigate to the login page
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation bar */}
      <nav className="bg-black py-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4 justify-end">
              {/* Add Recipe Button */}
              <Link to="/user/add" className="text-white hover:text-gray-300">
                Add Recipe
              </Link>
              <button
                className="text-white hover:text-gray-300"
                onClick={logoutHandler} 
              >
                Logout
              </button>
              {/* You can add more navigation links/buttons here */}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 text-white text-center">
        <div className="container mx-auto">
          © 2024 My Recipe App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
