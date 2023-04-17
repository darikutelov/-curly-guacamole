const express = require("express");

const itemRouter = express.Router();

const auth = require("../../middleware/auth");

const {
  httpSaveNftItem,
  httpGetAllNftItems,
  httpUpdateNftItem,
} = require("./items.controller");

itemRouter.get("/", httpGetAllNftItems);
itemRouter.post("/", auth, httpSaveNftItem);
itemRouter.post("/:itemId", auth, httpUpdateNftItem);

module.exports = itemRouter;
