import React, { useContext, useState, createContext, useEffect } from "react";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppWrapper({ children }) {
  const [clientSecret, setClientSecret] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState("");
  const [order, setOrder] = useState();
  const [shippingRate, setShippingRate] = useState(0);

  let subtotal = Number(0);
  let total = Number(0);
  let tax = Number(0);
  let tax_rate = Number(0.13);

  let shipping_cost = Number(15.0).toFixed(2);

  //Calculating Checkout Total
  if (cartItems) {
    subtotal = cartItems
      .reduce(
        (subtotal, item) =>
          Number(subtotal) + Number(item.price * item.quantity),
        0
      )
      .toFixed(2);
    tax = (
      (Number(subtotal) + Number(shipping_cost)) *
      Number(tax_rate)
    ).toFixed(2);
    total = Number(subtotal) + Number(shipping_cost) + Number(tax);
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
        setOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
