import React, { createContext, useContext, useState } from "react";

const storeContext = createContext();
const StoreProvider = ({ children }) => {
  const [selectedRecipe, setSelectedRecipe] = useState([]);

  return (
    <storeContext.Provider
      value={{
        selectedRecipe,
        setSelectedRecipe,
      }}
    >
      {children}
    </storeContext.Provider>
  );
};
export const State = () => {
  return useContext(storeContext);
};

export default StoreProvider;
