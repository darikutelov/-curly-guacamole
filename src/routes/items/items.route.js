const express = require("express");

const itemRouter = express.Router();

const { httpSaveNftItem, httpGetAllNftItems } = require("./items.controller");

itemRouter.get("/", httpGetAllNftItems);
itemRouter.post("/", httpSaveNftItem);

module.exports = itemRouter;
