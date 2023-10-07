import React, { useContext, useState, createContext, useEffect } from "react";

const AppContext = createContext();

//allows useContext in any components
export function useAppContext() {
  return useContext(AppContext);
}

//wrapper that wraps over the main App

export function AppWrapper({ children }) {
  const [clientSecret, setClientSecret] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState("");
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState();
  const [order, createOrder] = useState();
  const [shippingRate, setShippingRate] = useState(0);

  let subtotal = Number(0);
  let total = Number(0);
  let tax = Number(0);
  let taxRate = Number(0.13);

  let shippingCost = Number(15.0).toFixed(2);

  //Calculating Checkout Total
  if (cartItems) {
    subtotal = cartItems
      .reduce(
        (subtotal, item) =>
          Number(subtotal) + Number(item.price * item.quantity),
        0
      )
      .toFixed(2);
    tax = ((Number(subtotal) + Number(shippingCost)) * Number(taxRate)).toFixed(
      2
    );
    total = Number(subtotal) + Number(shippingCost) + Number(tax);
  }

  return (
    <AppContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartQuantity,
        setCartQuantity,
        clientSecret,
        setClientSecret,
        shippingRate,
        setShippingRate,
        cartSubtotal,
        setCartSubtotal,
        order,
        createOrder,
        shippingAddress,
        setShippingAddress,
        billingAddress,
        setBillingAddress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
