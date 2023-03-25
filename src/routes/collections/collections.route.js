const express = require("express");

const collectionsRouter = express.Router();

const {
  httpGetAllCollections,
  httpSaveCollection,
} = require("./collections.controller");

collectionsRouter.get("/", httpGetAllCollections);
collectionsRouter.post("/", httpSaveCollection);

module.exports = collectionsRouter;
