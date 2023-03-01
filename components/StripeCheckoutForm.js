import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";
import { config } from "../constants/constants";

export default function StripeCheckoutForm(props) {
  const { clientSecret, billingAddress } = useAppContext();
  const URL = config.url;
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  console.log(billingAddress);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    fetch(`${URL}/api/order/billing-address/${props.orderId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        billingAddress: billingAddress,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data.order))
      .catch((err) => console.log(err));

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/order/${props.orderId}`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form className="w-full " id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      {message && (
        <div className="pt-2 text-red-600" id="payment-message">
          {message}
        </div>
      )}
      <div className="flex flex-row justify-between items-center w-full pt-4">
        <Link href="/checkout">
          <div className="flex flex-row items-center">
            <div className="pr-1">
              <IoChevronBack size={18} />
            </div>
            Return to information
          </div>
        </Link>
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
      </div>
      {/* Show any error or success messages */}
    </form>
  );
}
