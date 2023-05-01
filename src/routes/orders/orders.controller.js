const {
  addUserOrder,
  updateOrderStatus,
} = require("../../models/orders/orders.model");

async function httpAddUserOrder(req, res) {
  const userId = req.params.userId;
  const order = req.body;

  try {
    const createdOrder = await addUserOrder(userId, order);
    return res.status(200).json(createdOrder);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
}

async function httpUpdateOrderStatus(req, res) {
  const { status } = req.body;
  const orderId = req.params.orderId;
  console.log({ status, orderId });
  if (
    ![
      "PENDING",
      "CONFIRMED",
      "AWAITINGPAYMENT",
      "COMPLETED",
      "CANCELLED",
    ].includes(status)
  ) {
    return res.status(400).json({ error: "Невалиден статус" });
  }
  try {
    const successMessage = await updateOrderStatus(orderId, status);
    console.log({ successMessage });
    return res.status(200).json(successMessage);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}

async function httpGetPublishableKey(req, res) {
  return res
    .status(200)
    .json({ publishableKey: process.env.STRIPE_TEST_PUBLISHABLE_KEY });
}

module.exports = {
  httpAddUserOrder,
  httpUpdateOrderStatus,
  httpGetPublishableKey,
};
