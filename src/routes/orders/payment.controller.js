const stripeClient = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

async function httpCreatePaymentIntent(req, res) {
  const { amount } = req.body;
  const orderAmount = Math.floor(Number(amount) * 100);

  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: orderAmount,
      currency: "usd",
      payment_method_types: ["card"], //by default is "card"
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({ error: { message: e.message } });
  }
}

module.exports = {
  httpCreatePaymentIntent,
};
