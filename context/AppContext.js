import React, { useContext, useState, createContext, useEffect } from "react";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppWrapper({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    let cartItemsList = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cartItemsList);
  }, []);

  return (
    <AppContext.Provider
      value={{
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
