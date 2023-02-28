import React from "react";
import { AddressElement } from "@stripe/react-stripe-js";
import { useAppContext } from "../context/AppContext";

const BillingAddressForm = (props) => {
  const { order, billingAddress, setBillingAddress } = useAppContext();

  //#3 initialize default billing address
  if (order) {
    localStorage.setItem("order", JSON.stringify(addBillingAddress));
  }

  return (
    <form>
      <AddressElement
        options={{
          mode: "billing",
          defaultValues: billingAddress,
        }}
        onChange={(e) => {
          if (e.complete) {
            setBillingAddress(e.value.address);
          }
        }}
      />
    </form>
  );
};

export default BillingAddressForm;
