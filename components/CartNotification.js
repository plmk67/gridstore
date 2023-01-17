import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Button } from "@chakra-ui/react";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";

const CartNotification = () => {
  const { isCartNotification, setIsCartNotification } = useAppContext();

  const toggleCartNotification = () => {
    setIsCartNotification(!isCartNotification);
  };

  return (
    <div
      className={`flex justify-end absolute top-0 right-0 h-full w-full  duration-400  ease-in  transition-opacity bg-gray-400/75 ${
        isCartNotification ? " translate-x-0 " : "translate-x-full z-index-1 "
      }`}
      onClick={() => toggleCartNotification()}
    >
      <div
        className={`
    flex flex-col justify-between bg-stone-50 h-full w-[400px] z-index-3 ease-in absolute duration-400 ${
      isCartNotification ? "translate-x-0" : "translate-x-full"
    }`}
      >
        <div className="flex pt-4 px-4 flex-col w-full ">
          <div className="flex flex-row justify-between align-items bold text-lg w-full">
            <div>Cart</div>
            <div>
              <CloseIcon
                className="hover:opacity-75"
                onClick={() => toggleCartNotification()}
                boxSize={4}
              />
            </div>
          </div>
          <div className="flex flex-row items-center pt-2 text-xs font-light ">
            <div>
              <CheckIcon boxSize={4} className="pr-2" />
            </div>

            <div>Item added to your cart</div>
          </div>
          <div className="flex pt-4 flex-row justify-between h-24">
            <div>Uncrating the Japanese House</div>
            <div className="">
              <img
                className="h-full"
                src="https://cdn.shopify.com/s/files/1/0616/7448/8046/products/SORT-Vancouver-Book-JapaneseHouse_140x.jpg?v=1670455056"
                alt="sample product"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col px-4 py-36">
          <div className="text-xs font-light">
            Shipping & taxes calculated at checkout
          </div>
          <div className="flex flex-row pt-2 justify-center items-center h-12">
            <Button colorScheme="gray" className="w-full " size="md">
              Check out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartNotification;
