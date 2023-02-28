import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, CircularProgress } from "@chakra-ui/react";
import { RiCheckboxCircleLine } from "react-icons/ri";
import Map from "../../components/Map";

const order = () => {
  const router = useRouter();
  const [order, setOrder] = useState([]);
  const [coordinates, setCoordinates] = useState("");
  const [isLoading, setLoading] = useState(true);
  const {
    orderId,
    payment_intent_client_secret,
    payment_intent,
    redirect_status,
  } = router.query;

  let subtotal = Number(0);
  let total = Number(0);
  let tax = Number(0);
  let tax_rate = Number(0.13);
  let shipping_cost = Number(15.0).toFixed(2);

  useEffect(() => {
    if (redirect_status === "succeeded") {
      localStorage.removeItem("cart");
      localStorage.removeItem("order");
      localStorage.removeItem("checkoutSessionId");
    }

    if (orderId) {
      fetch(`http://localhost:4000/api/order/${orderId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(
          (data) => (
            setOrder(data.order),
            setCoordinates(data.address),
            setLoading(false)
          )
        )
        .catch((err) => console.log(err));
    }
  }, [redirect_status, orderId]);

  const {
    billingAddress,
    shippingAddress,
    lineItems,
    phoneNumber,
    email,
    firstName,
  } = order;

  if (order.lineItems) {
    subtotal = order.lineItems
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
    <div>
      <div className="font-bold text-4xl py-4 ml-4 pl-4">
        <Link href="/">GRIDS</Link>
      </div>

      {isLoading && order ? (
        <div className="flex w-full justify-center items-center h-40">
          <CircularProgress isIndeterminate />
        </div>
      ) : (
        <div className="flex flex-row justify-center w-full min-w-[640px]">
          <div className="flex flex-col w-1/2 pr-8">
            <div className="flex flex-row items-center px-8">
              <div className="pr-2">
                <RiCheckboxCircleLine color="green" size={42} />
              </div>

              <div className="flex flex-col leading-tight">
                <div className="text-sm">Order #1568</div>
                <div className="font-semibold">Thank you {firstName}!</div>
              </div>
            </div>
            <div className="w-full ml-8 mt-8 rounded-md border-2 outline-2 outline-gray-200 ">
              <div className="">
                <Map coordinates={coordinates} />
              </div>
              <div className="p-4">
                <div>Your order is confirmed</div>
                <div className="pt-2 text-sm">
                  You'll receive an email when your order is ready
                </div>
              </div>
            </div>
            <div className="w-full mx-8 mt-4 p-4 rounded-md border-2 outline-2 outline-gray-200 ">
              <div className="text-xl font-semibold">Customer information</div>
              <div className="pt-4 flex">
                <div className="w-1/2 pt-2">
                  <div className="">
                    <div className="text-lg font-medium">
                      Contact information
                    </div>
                    <div className="pt-2">{email}</div>
                  </div>
                  <div className="pt-4">
                    <div className="text-lg font-medium">Shipping address</div>
                    <div className="pt-2">
                      <div>
                        {shippingAddress.firstName} {shippingAddress.lastName}
                      </div>
                      <div>{shippingAddress.line1}</div>
                      <div>{shippingAddress.line2}</div>
                      <div>
                        {shippingAddress.city}, {shippingAddress.province}{" "}
                        {shippingAddress.postalCode}
                      </div>
                      <div>{phoneNumber}</div>
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
                      <div>
                        {shippingAddress.firstName} {shippingAddress.lastName}
                      </div>
                      <div>{billingAddress.line1}</div>
                      <div>{billingAddress.line2}</div>
                      <div>
                        {billingAddress.city}, {billingAddress.state}{" "}
                        {shippingAddress.postalCode}{" "}
                      </div>
                      <div>{phoneNumber}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center pt-4 ml-8  w-full">
              <div className="flex flex-row">
                <div>Need help? Contact us at order@gridstore.com </div>
              </div>
              <div>
                <Link href="/">
                  <Button>Continue Shopping</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-1/2 max-w-[500px] px-8">
            <div className="invisible md:visible">
              <div className="flex flex-col ">
                {order.lineItems.length > 0 &&
                  order.lineItems?.map((item, index) => {
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
      )}
    </div>
  );
};

export default order;
