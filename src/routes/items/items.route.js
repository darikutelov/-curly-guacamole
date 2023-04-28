const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "src/uploads/images" });

const itemRouter = express.Router();

const auth = require("../../middleware/auth");

const {
  httpSaveNftItem,
  httpGetAllNftItems,
  httpUpdateNftItem,
  httpNftItemAddBid,
  httpSaveNftImage,
} = require("./items.controller");

itemRouter.get("/", httpGetAllNftItems);
itemRouter.post("/", auth, httpSaveNftItem);
itemRouter.post("/images", upload.single("nft"), httpSaveNftImage);
itemRouter.post("/", auth, httpSaveNftItem);
itemRouter.post("/:itemId", auth, httpUpdateNftItem);
itemRouter.post("/:itemId/bids", auth, httpNftItemAddBid);

module.exports = itemRouter;
