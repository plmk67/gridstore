import Link from "next/link";
import React, { useEffect } from "react";
import {
  Accordion,
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import { RiShoppingCart2Line } from "react-icons/ri";
import { useAppContext } from "../context/AppContext";
import CheckoutForm from "../components/CheckoutForm";

const checkout = () => {
  const { cartItems, setCartItems } = useAppContext();

  let subtotal = Number(0);
  let total = Number(0);
  let tax = Number(0);
  let tax_rate = Number(0.13);

  let shipping_cost = Number(15.0).toFixed(2);

  useEffect(() => {
    let cartItemsList = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cartItemsList);
  }, []);

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
    total = (Number(subtotal) + Number(shipping_cost) + Number(tax)).toFixed(2);
  }

  return (
    <div className="flex flex-col items-center min-w[640px] max-w[1280px]">
      <div className=" w-full max-w-[640px]">
        <div className="font-bold text-4xl py-4 pl-3">
          <Link href="/">GRIDS</Link>
        </div>
        <div className="">
          <div>
            <Accordion allowToggle>
              <AccordionItem>
                <div className="flex flex-row items-center justify-between">
                  <div className="py-2">
                    <AccordionButton>
                      <div className="pr-2">
                        <RiShoppingCart2Line />
                      </div>
                      <div className="font-sm">Show order summary</div>
                      <AccordionIcon />
                    </AccordionButton>
                  </div>
                  <div className="font-semibold pr-3">${total}</div>
                </div>

                <AccordionPanel>
                  <div>
                    <div className="">
                      <div className="flex flex-col">
                        {cartItems.length > 0 &&
                          cartItems?.map((item, index) => {
                            return (
                              <div className="flex flex-row items-center justify-between h-24">
                                <div className="flex flex-row items-center">
                                  <div className="h-16 w-16 pr-4 rounded-sm relative">
                                    <div className="relative ">
                                      <img
                                        className="rounded-lg"
                                        src={item.image}
                                        alt={item.description}
                                      />
                                      <div className="flex justify-center items-center absolute rounded-full -top-2 -right-2 bg-gray-600 w-4 h-4 text-xs font-semibold text-slate-50">
                                        {item.quantity}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-sm font-semibold">
                                    {item.product_name}
                                  </div>
                                </div>
                                <div className="text-sm font-semibold">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>

                  <div className="py-4">
                    <div className="flex flex-row justify-between text-sm pb-2">
                      <div>Subtotal</div>
                      <div className="font-semibold">${subtotal}</div>
                    </div>
                    <div className="flex flex-row justify-between text-sm pb-2">
                      <div>Shipping</div>
                      <div className="font-semibold">${shipping_cost}</div>
                    </div>
                    <div className="flex flex-row justify-between text-sm">
                      <div>Estimated taxes</div>
                      <div className="font-semibold">${tax}</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row justify-between items-center text-sm pb-2">
                      <div className="font-semi-bold">Total</div>
                      <div className="font-semibold text-2xl">${total}</div>
                    </div>
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="pt-4">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default checkout;
