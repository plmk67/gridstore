import React, { useContext, useState, createContext, useEffect } from "react";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppWrapper({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState([]);

  useEffect(() => {
    let cartItemsList = JSON.parse(localStorage.getItem("cart") || "[]");
    let cartQuantity = cartItemsList.reduce(
      (total_quantity, item) => total_quantity + item.quantity,
      0
    );
    setCartItems(cartItemsList);
    setCartQuantity(cartQuantity);
  }, []);
  console.log(cartQuantity);

  return (
    <AppContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartQuantity,
        setCartQuantity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
