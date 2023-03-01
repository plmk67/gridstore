import React, { useEffect, useState, useRef } from "react";
import Header from "../../../components/Header";
import { useAppContext } from "../../../context/AppContext";
import { useHttpClient } from "../../../components/http-hook";
import {
  Button,
  CircularProgress,
  Input,
  useNumberInput,
  HStack,
  Drawer,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import Link from "next/link";
import { config } from "../../../constants/constants";

const Product = (query) => {
  const { sendRequest, isLoading, setIsLoading } = useHttpClient();
  const { error, setError } = useState(false);
  const { setCartItems } = useAppContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const [product, setProduct] = useState({});
  let id = query.query.id;
  const URL = config.url;

  const { description, image, product_name, price } = product;

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 25,
      keepWithinRange: true,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        let res = await sendRequest(`${URL}/api/products/${id}`);
        setProduct(res.product);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        // toast({
        //   description: "We've created your account for you.",
        //   status: "error",
        //   duration: 9000,
        //   isClosable: true,
        // });
      }
    };
    fetchProduct();
  }, [id]);

  const AddToCart = (quantity) => {
    //set minimal value as 1
    if (quantity < 1) {
      quantity = 1;
    }

    //verify from cookies what is currently on the cart
    let cartItemsList = JSON.parse(localStorage.getItem("cart") || "[]");
    let item = { image, product_name, price, quantity };

    //see if item exists on cart
    let itemExists = cartItemsList.find(
      (item) => item.product_name === product_name
    );

    //if exists, replace cart value. else add as new line item
    if (typeof itemExists !== "undefined") {
      let index = cartItemsList.findIndex(
        (item) => item.product_name === product_name
      );
      cartItemsList.splice(index, 1, item);
      localStorage.setItem("cart", JSON.stringify(cartItemsList));
      setCartItems(cartItemsList);
    } else {
      cartItemsList.push(item);
      localStorage.setItem("cart", JSON.stringify(cartItemsList));
      setCartItems(cartItemsList);
    }

    //opens toast to add item
    onOpen();
  };

  let retail_price = 0;

  if (price) {
    retail_price = price.toFixed(2);
  }

  return (
    <div className="flex flex-col items-center h-full">
      <Header />
      {isLoading ? (
        <div className="flex flex-row justify-center items-center h-full ">
          <CircularProgress isIndeterminate />
        </div>
      ) : (
        <div className="flex flex-col-reverse md:flex-row px-4 pt-12 max-w-[1440px] h-full">
          <div className="flex flex-col items-end w-full  md:w-1/2">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 md:pl-4 ">
                <div className="flex flex-row justify-between font-light text-xs pr-8 md:flex-col">
                  <div className="pb-8 md:pb-2">
                    <div className="pb-2">(Dimensions)</div>
                    <div>Short: 65mm H x 85mm Ø Tall: 95mm H x 85mm Ø</div>
                  </div>
                  <div className="md:pb-2">
                    <div className="pb-2">(Materials)</div>
                    <div>Porcelain</div>
                  </div>
                  <div className="md:pb-2">
                    <div className="pb-2">(Specifications)</div>
                    <div>Dishwasher Safe Made in Japan</div>
                  </div>
                </div>
              </div>
              <div className="order-first md:order-last md:w-3/5 md:pr-12">
                <div className="pb-4 md:hidden">{product_name}</div>
                <div className="pb-2 md:pb-4 font-light text-xs leading-5">
                  {description}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-3/5 md:pr-12 ">
              <div className="flex flex-row pb-4 md:pb-4">
                <div className="flex flex-col justify-between w-1/2 md:w-2/5">
                  <div className="pb-2 text-xs font-medium">Price</div>
                  <div>${retail_price}</div>
                </div>
                <div className="flex flex-col justify-between w-1/2 md:w-3/5 ">
                  <div className="pb-2 text-xs font-medium text-center">
                    Quantity
                  </div>
                  <div>
                    <HStack className="h-8">
                      <Button {...dec}>-</Button>

                      <Input className="text-center" {...input} width="auto" />

                      <Button {...inc}>+</Button>
                    </HStack>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <Button
                  onClick={() => AddToCart(input.value)}
                  className="w-full"
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-row pb-8 w-full md:w-1/2  ">
            <img className="w-full" src={image} alt="test image" />
          </div>
        </div>
      )}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <div className="flex flex-col justify-between  h-full">
            <div>
              <DrawerCloseButton />
              <div className="flex pt-4 px-4 flex-col w-full ">
                <div className="flex flex-row justify-between align-items bold text-lg w-full">
                  <div>Cart</div>
                </div>
                <div className="flex flex-row items-center pt-2 text-xs font-light ">
                  <div>Item added to your cart</div>
                </div>
                <div className="flex pt-4 flex-row justify-between h-24">
                  <div>{product_name}</div>
                  <div className="">
                    <img className="h-full" src={image} alt="sample product" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col ">
              <DrawerFooter>
                <div className="flex flex-col items-start pb-16 w-full">
                  <div className="text-xs font-light">
                    Shipping & taxes calculated at checkout
                  </div>
                  <div className="flex flex-row pt-2 items-center h-12 w-full">
                    <Link href="/cart" className="w-full">
                      <Button colorScheme="gray" size="md" width="100%">
                        Check out
                      </Button>
                    </Link>
                  </div>
                </div>
              </DrawerFooter>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

Product.getInitialProps = ({ query }) => {
  return { query };
};

export default Product;
