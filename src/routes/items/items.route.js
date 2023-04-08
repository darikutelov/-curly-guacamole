const express = require("express");

const itemRouter = express.Router();

const {
  httpSaveNftItem,
  httpGetAllNftItems,
  httpUpdateNftItem,
} = require("./items.controller");

itemRouter.get("/", httpGetAllNftItems);
itemRouter.post("/", httpSaveNftItem);
itemRouter.post("/:itemId", httpUpdateNftItem);

module.exports = itemRouter;
