import React from "react";

const OrderSummary = (items) => {
  return (
    <div>
      <div>
        <div className="flex flex-col">
          {items.length > 0 &&
            items?.map((item, index) => {
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
  );
};

export default OrderSummary;
