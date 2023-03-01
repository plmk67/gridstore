import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { HStack, Input, Button } from "@chakra-ui/react";
import Header from "../components/Header";
import Link from "next/link";
import FeaturedCollection from "../components/FeaturedCollection";
import { RiDeleteBinLine, RiArrowRightUpLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { config } from "../constants/constants";
const cart = () => {
  const {
    cartItems,
    cartSubtotal,
    setCartItems,
    setCartQuantity,
    setCartSubtotal,
  } = useAppContext();
  const URL = config.url;

  const router = useRouter();

  useEffect(() => {
    //check what was added during browsing session or previous browsing session
    let cartItemsList = JSON.parse(localStorage.getItem("cart") || "[]");
    let cartQuantity = cartItemsList.reduce(
      (total_quantity, item) => Number(total_quantity) + Number(item.quantity),
      0
    );

    let cartSubtotal = cartItemsList.reduce(
      (total_quantity, item) =>
        Number(total_quantity) + Number(item.quantity) * Number(item.price),
      0
    );

    setCartItems(cartItemsList);
    setCartQuantity(cartQuantity);
    setCartSubtotal(cartSubtotal);
  }, []);

  const handleChange = (value, product_name, action) => {
    //min quantity value
    if (value < 1) {
      value = Number(1);
    }
    //max inventory value
    if (value > 25) {
      value = Number(25);
    }

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

    let updatedCartSubtotal = updatedQuantity.reduce(
      (total_quantity, item) =>
        Number(total_quantity) + Number(item.quantity) * Number(item.price),
      0
    );

    let updatedCartQuantity = updatedQuantity.reduce(
      (total_quantity, item) => Number(total_quantity) + Number(item.quantity),
      0
    );

    localStorage.setItem("cart", JSON.stringify(updatedQuantity));
    setCartItems(updatedQuantity);
    setCartQuantity(updatedCartQuantity);
    setCartSubtotal(updatedCartSubtotal);
  };

  const deleteItem = (product_name) => {
    let removedItemList = cartItems.filter(
      (item) => item.product_name !== product_name
    );

    localStorage.setItem("cart", JSON.stringify(removedItemList));
    setCartItems(removedItemList);

    let updatedCartQuantity = removedItemList.reduce(
      (total_quantity, item) => Number(total_quantity) + Number(item.quantity),
      0
    );
    setCartQuantity(updatedCartQuantity);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let checkoutSessionId = JSON.parse(
      localStorage.getItem("checkoutSessionId")
    );

    if (checkoutSessionId === null) {
      //creates checkoutSessionId
      fetch(`${URL}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineItems: cartItems,
        }),
      })
        .then((res) => res.json())
        .then(
          (data) => (
            router.push(`/checkout/${data.order.id}`, null, {
              shallow: true,
            }),
            localStorage.setItem(
              "checkoutSessionId",
              JSON.stringify(data.order.id)
            )
          )
        );
    } else {
      //update lineItems on checkoutSessionId
      fetch(`${URL}/api/order/items/${checkoutSessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineItems: cartItems,
        }),
      })
        .then((res) => res.json())
        .then((data) =>
          router.push(`/checkout/${checkoutSessionId}`, null, {
            shallow: true,
          })
        );
    }
  };

  return (
    <>
      <Header />
      <div className="p-8 h-full w-full min-w-[500px]">
        {cartItems.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <div>Your shopping cart is empty</div>
            <div className="flex flex-row items-center pt-8 hover:underline">
              <Link href="/">Continue shopping</Link>
              <RiArrowRightUpLine size={20} color="gray" />
            </div>
          </div>
        )}

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
                    className="font-light text-sm pr-4 sm:shrink-0 "
                  >
                    QUANTITY
                  </th>
                  <th scope="col" className="font-light text-sm">
                    TOTAL
                  </th>
                  <th scope="col" className="font-light text-center text-sm">
                    REMOVE
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

                    let retail_price = price;
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
                            <Button
                              isDisabled={quantity < 0}
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
                            <input
                              type="number"
                              className="w-10 text-center"
                              value={quantity}
                              onChange={() =>
                                handleChange(event.target.value, product_name)
                              }
                              min="1"
                              max="25"
                            />
                            <Button
                              colorScheme="gray"
                              isDisabled={quantity >= 25}
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
                        <td className="h-36 pt-2 align-top ">${subtotal}</td>
                        <td className="h-36 pt-2 align-top text-center">
                          <button
                            className="h-15 w-15"
                            onClick={() => deleteItem(product_name)}
                          >
                            <RiDeleteBinLine size={20} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="flex flex-col items-end w-full">
              <div className="flex flex-row items-end pb-2">
                <div className="pr-8 font-lg">Subtotal</div>
                <div className="font-lg bold">
                  ${Number(cartSubtotal).toFixed(2)} CAD
                </div>
              </div>
              <div className="text-xs font-light pb-4">
                Taxes and shipping calculated at checkout
              </div>

              <Button onClick={onSubmit} colorScheme="gray" className="w-80">
                Check out
              </Button>
            </div>
          </div>
        )}
        {/* <div>
          <FeaturedCollection />
        </div> */}
      </div>
    </>
  );
};

export default cart;
