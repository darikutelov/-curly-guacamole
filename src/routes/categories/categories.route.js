const express = require("express");

const categoriesRouter = express.Router();

const {
  httpGetAllCategories,
  httpSaveCategory,
} = require("./categories.controller");

categoriesRouter.get("/", httpGetAllCategories);
categoriesRouter.post("/", httpSaveCategory);

module.exports = categoriesRouter;
