import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { HStack, Input, Button } from "@chakra-ui/react";
import Header from "../components/Header";
import Link from "next/link";

const cart = () => {
  const { cartItems, setCartItems } = useAppContext();

  useEffect(() => {
    let cartItemsList = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cartItemsList);
  }, []);

  const handleChange = (value, product_name, action) => {
    let updatedQuantity = cartItems.map((item) => {
      if (item.product_name === product_name) {
        switch (action) {
          case "INC":
            return { ...item, quantity: Number(item.quantity) + 1 };

          case "DEC":
            if (item.quantity > 1) {
              return { ...item, quantity: Number(item.quantity) - 1 };
            } else {
              return item;
            }

          default:
            return { ...item, quantity: value };
        }
      } else {
        return item;
      }
    });

    localStorage.setItem("cart", JSON.stringify(updatedQuantity));
    setCartItems(updatedQuantity);
  };

  return (
    <>
      <Header />
      <div className="p-8 h-full w-full min-w-[500px]">
        {cartItems.length === 0 && "is empty"}

        {cartItems.length > 0 && (
          <div className="table-auto">
            <div className="">
              <div>Your cart </div>
            </div>
            <table className="w-full ">
              <thead className="h-24 ">
                <tr className="text-left ">
                  <th scope="col" className="font-light w-2/3 text-sm ">
                    PRODUCT
                  </th>
                  <th
                    scope="col"
                    className="font-light  text-sm pr-4 sm:shrink-0 "
                  >
                    QUANTITY
                  </th>
                  <th scope="col" className="font-light text-sm">
                    TOTAL
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {cartItems.length > 0 &&
                  cartItems.map((item, index) => {
                    const {
                      description,
                      image,
                      product_name,
                      price,
                      quantity,
                    } = item;

                    let retail_price = price.toFixed(2);
                    let subtotal = (retail_price * quantity).toFixed(2);

                    return (
                      <tr className="h-36">
                        <td className="flex flex-row ">
                          <div className="h-36 min-w-[120px] ">
                            <img
                              src={image}
                              alt="sample product"
                              className="h-full w-full object-fit"
                            />
                          </div>
                          <div className="pl-12">
                            <div className="">{product_name}</div>
                            <div>${retail_price}</div>
                          </div>
                        </td>
                        <td className="sm:shrink-0 align-top ">
                          <HStack maxW="320px" className="w-40">
                            <Input
                              type="number"
                              className="w-8"
                              value={quantity}
                              onChange={() =>
                                handleChange(event.target.value, product_name)
                              }
                              min="0"
                              max="20"
                            />
                            <Button
                              colorScheme="gray"
                              onClick={() =>
                                handleChange(
                                  event.target.value,
                                  product_name,
                                  "DEC"
                                )
                              }
                            >
                              -
                            </Button>
                            <Button
                              colorScheme="gray"
                              onClick={() =>
                                handleChange(
                                  event.target.value,
                                  product_name,
                                  "INC"
                                )
                              }
                            >
                              +
                            </Button>
                          </HStack>
                        </td>
                        <td className="h-36 pt-2 align-top">${subtotal}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="flex flex-col items-end w-full">
              <div className="flex flex-row items-end pb-2">
                <div className="pr-8 font-lg">Subtotal</div>
                <div className="font-lg bold">$45.00 CAD</div>
              </div>
              <div className="text-xs font-light pb-4">
                Taxes and shipping calculated at checkout
              </div>
              <Link href="/checkout">
                <Button colorScheme="gray" className="w-80">
                  Check out
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default cart;
