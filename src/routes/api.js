const express = require("express");

// routers
const categoriesRouter = require("./categories/categories.route");
const collectionsRouter = require("./collections/collections.route");
const nftItemsRoutner = require("./items/items.route");
const userRouter = require("./user/user.route");
const orderRouter = require("./orders/orders.route");

const api = express.Router();

// Register routes
api.use("/categories", categoriesRouter);
api.use("/collections", collectionsRouter);
api.use("/nft-items", nftItemsRoutner);
api.use("/users", userRouter);
api.use("/orders", orderRouter);

module.exports = api;
