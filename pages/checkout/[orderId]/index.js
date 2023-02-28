import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  CircularProgress,
} from "@chakra-ui/react";

import { RiShoppingCart2Line, RiArrowDropRightLine } from "react-icons/ri";
import { useAppContext } from "../../../context/AppContext";
import ShippingAddressForm from "../../../components/ShippingAddressForm";

const index = (props) => {
  const orderId = props.query.orderId;
  const { cartItems, setCartItems, setClientSecret } = useAppContext();
  const [isLoading, setLoading] = useState(true);

  //set up subtotal calculations
  let subtotal = Number(0);
  let total = Number(0);
  let tax = Number(0);
  let tax_rate = Number(0.13);
  let shipping_cost = Number(15.0).toFixed(2);

  if (cartItems) {
    subtotal = Number(
      cartItems.reduce(
        (total_quantity, item) =>
          Number(total_quantity) + Number(item.quantity) * Number(item.price),
        0
      )
    ).toFixed(2);
    tax = (
      (Number(subtotal) + Number(shipping_cost)) *
      Number(tax_rate)
    ).toFixed(2);
    total = (Number(subtotal) + Number(shipping_cost) + Number(tax)).toFixed(2);
  }

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:4000/api/order/items/${orderId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setCartItems(data.cartItems.lineItems));

    setLoading(false);
  }, []);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        total: total * 100,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div className="flex flex-col items-center min-w[640px] ">
      <div className="w-full min-w-[640px]">
        <div className="font-bold text-4xl py-4 pl-3">
          <Link href="/">GRIDS</Link>
        </div>

        {isLoading ? (
          <div className="flex flex-row justify-center items-center w-full h-96 ">
            <CircularProgress isIndeterminate />
          </div>
        ) : (
          <div className="flex flex-col items-center w-full ">
            <div className="flex flex-col md:flex-row md:min-w-[850px] md:max-w-[1280px] ">
              <div className="md:hidden">
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
                        <div className="flex flex-col">
                          {cartItems.length > 0 &&
                            cartItems?.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className="flex flex-row items-center justify-between h-24"
                                >
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
                          <div className="font-semibold">Total</div>
                          <div className="font-semibold text-2xl">${total}</div>
                        </div>
                      </div>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="pt-4 md:w-3/5  md:pr-8">
                <div className="flex flex-row pb-4">
                  <div className="flex flex-row items-center pr-4 hover:underline">
                    <Link href="/cart">Cart </Link>
                  </div>
                  <RiArrowDropRightLine size={30} />
                  <div className="flex flex-row items-center pr-4 font-medium hover:underline">
                    <Link href="/checkout">Information </Link>
                  </div>
                  <RiArrowDropRightLine size={30} />
                  <div className="flex flex-row items-center pr-4 ">
                    Payment
                  </div>
                </div>
                <ShippingAddressForm orderId={orderId} />
              </div>
              <div className="md:w-2/5">
                <div className="invisible md:visible">
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
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

index.getInitialProps = ({ query }) => {
  return { query };
};

export default index;
