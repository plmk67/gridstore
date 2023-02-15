const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (cartItems, tax_rate, shipping_cost) => {
  let total = 0;
  let subtotal = 0;
  if (cartItems) {
    cartItems
      ?.reduce(
        (subtotal, item) =>
          Number(subtotal) + Number(item.price * item.quantity),
        0
      )
      .toFixed(2);

    total = (Number(subtotal) + Number(shipping_cost)) * (1 + tax_rate);
  }

  return total;
};

export default async function handler(req, res) {
  const { total } = req.body;
  console.log(total);

  //issue is that total amount is updated twice in a short period of time.

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
