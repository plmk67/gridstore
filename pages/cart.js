import React from "react";
import { useNumberInput, HStack, Input, Button } from "@chakra-ui/react";
import Header from "../components/Header";

const cart = () => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 100,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <>
      <Header />
      <div className="p-8 h-full w-full min-w-[500px]">
        <div className="">
          <div>Your cart</div>
        </div>
        <div className="table-auto">
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
              <tr className="h-36">
                <td className="flex flex-row items-start pb-4">
                  <div className="h-36 min-w-[120px] bg-red-100">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0616/7448/8046/products/BIG-GAME--Everyday-Objects_300x.jpg?v=1666997607"
                      alt="sample product"
                      className="h-full w-full object-fit"
                    />
                  </div>
                  <div className="pl-12 ">
                    <div className="">
                      BIG-GAME: Everyday Objects — Industrial Design Works
                    </div>
                    <div>$45.00</div>
                  </div>
                </td>
                <td className="sm:shrink-0 text-top ">
                  <HStack maxW="320px" className="w-36">
                    <Button colorScheme="gray" {...dec}>
                      -
                    </Button>
                    <Input className="w-4" {...input} />
                    <Button colorScheme="gray" {...inc}>
                      +
                    </Button>
                  </HStack>
                </td>
                <td className="h-36">$45.00</td>
              </tr>
              <tr className="h-36">
                <td className="flex flex-row ">
                  <div className="h-36 min-w-[120px] bg-red-100">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0616/7448/8046/products/BIG-GAME--Everyday-Objects_300x.jpg?v=1666997607"
                      alt="sample product"
                      className="h-full w-full object-fit"
                    />
                  </div>
                  <div className="pl-12">
                    <div className="">
                      BIG-GAME: Everyday Objects — Industrial Design Works
                    </div>
                    <div>$45.00</div>
                  </div>
                </td>
                <td className="sm:shrink-0 text-top ">
                  <HStack maxW="320px" className="w-36">
                    <Button colorScheme="gray" {...dec}>
                      -
                    </Button>
                    <Input className="w-4" {...input} />
                    <Button colorScheme="gray" {...inc}>
                      +
                    </Button>
                  </HStack>
                </td>
                <td className="h-36">$45.00</td>
              </tr>
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
            <Button colorScheme="gray" className="w-80">
              Check out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default cart;
