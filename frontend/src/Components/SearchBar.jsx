import React, { useState } from "react";

const SearchBar = ({ onSearch, loading, error }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSearch prop with the query value
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 mr-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        disabled={!query || loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default SearchBar;
