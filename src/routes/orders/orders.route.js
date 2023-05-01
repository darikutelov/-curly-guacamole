const express = require("express");

const orderRouter = express.Router();

const {
  httpAddUserOrder,
  httpUpdateOrderStatus,
  httpGetPublishableKey,
} = require("./orders.controller");

const { httpCreatePaymentIntent } = require("./payment.controller");

orderRouter.get("/pay/publishable-key", httpGetPublishableKey);
orderRouter.post("/pay/create-payment-intent", httpCreatePaymentIntent);
orderRouter.post("/:userId", httpAddUserOrder);
orderRouter.post("/:orderId/status", httpUpdateOrderStatus);

module.exports = orderRouter;
