import React, { createContext, useContext, useState } from "react";


const storeContext = createContext();
const StoreProvider = ({children}) => {
  const [selectedRecipe, setSelectedRecipe] = useState('');
  //const [user, setUser] = useState();
  //const [notification, setNotification] = useState([]);
  //const [stores, setstores] = useState();
  

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   setUser(userInfo);

  //   if (!userInfo) {navigate('/')} ;

  // },[navigate]);

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
