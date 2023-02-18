import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAppContext } from "../../context/AppContext";
import { Button } from "@chakra-ui/react";

import { RiCheckboxCircleLine } from "react-icons/ri";
import Map from "../../components/Map";

const order = () => {
  const router = useRouter();
  const { setCartItems } = useAppContext();
  const { payment_intent_client_secret, payment_intent, redirect_status } =
    router.query;

  useEffect(() => {
    console.log("clean up cart");
    console.log(typeof redirect_status);

    if (redirect_status === "succeeded") {
      localStorage.removeItem("cart");
      setCartItems([]);

      console.log("cleaned up function exec");
    }
  }, [redirect_status]);

  return (
    <div>
      <div className="font-bold text-4xl py-4 ml-4 pl-4">
        <Link href="/">GRIDS</Link>
      </div>
      <div className="flex flex-row items-center px-8">
        <div className="pr-2">
          <RiCheckboxCircleLine color="green" size={42} />
        </div>

        <div className="flex flex-col leading-tight">
          <div className="text-sm">Order #1568</div>
          <div className="font-semibold">Thank you Wei!</div>
        </div>
      </div>

      <div className="ml-8 mt-8 w-1/2 rounded-md border-2 outline-2 outline-gray-200 ">
        <div>
          <Map />
        </div>
        <div className="p-4">
          <div>Your order is confirmed</div>
          <div className="pt-2 text-sm">
            You'll receive and email when your order is ready
          </div>
        </div>
      </div>

      <div className="mx-8 mt-4 p-4 w-1/2 rounded-md border-2 outline-2 outline-gray-200 ">
        <div className="text-xl font-semibold">Customer information</div>
        <div className="pt-4 flex">
          <div className="pt-2 w-1/2">
            <div className="">
              <div className="text-lg font-medium">Contact information</div>
              <div className="pt-2">jennifer.doe@gmail.com</div>
            </div>
            <div className="pt-4">
              <div className="text-lg font-medium">Shipping address</div>
              <div className="pt-2">
                <div>Jennifer Doe</div>
                <div>1700 Summer Lane</div>
                <div>Montreal</div>
                <div>Canada</div>
                <div>423-232-2323</div>
              </div>
            </div>
            <div className="pt-4">
              <div className="text-lg font-medium">Shipping method</div>
              <div className="pt-2">
                <div>Free Regular Parcel shipping</div>
                <div>(3-10 Business Days)</div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="pt-2">
              <div className="text-lg font-medium">Payment method</div>
              <div className="pt-2">Visa (4242)</div>
            </div>
            <div className="pt-4">
              <div className="text-lg font-medium">Billing address</div>
              <div className="pt-2">
                <div>Jennifer Doe</div>
                <div>1700 Summer Lane</div>
                <div>Montreal</div>
                <div>Canada</div>
                <div>423-232-2323</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-1/2 justify-between items-center pt-4 ml-8 ">
        <div>Need help? Contact us</div>
        <div>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default order;
