const fs = require("fs");

const {
  saveItem,
  getAllItems,
  updateItem,
} = require("../../models/items/items.model");

const { addBid } = require("../../models/items/bids/bid.model");

async function httpGetAllNftItems(req, res) {
  const items = await getAllItems();
  return res.status(200).json({ nftItems: items });
}

async function httpSaveNftItem(req, res) {
  const { nftItem } = req.body;
  return res.status(200).json(await saveItem(nftItem));
}

async function httpUpdateNftItem(req, res) {
  const { itemId } = req.params;
  const item = req.body;
  console.log("😀");
  try {
    const updatedItem = await updateItem(itemId, item);
    res.status(200).json(updatedItem);
  } catch (error) {
    res.sendStatus(400);
  }
}

async function httpNftItemAddBid(req, res) {
  const { itemId } = req.params;
  const bid = req.body;

  try {
    const updatedItem = await addBid(req, itemId, bid);
    res.status(200).json(updatedItem);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
}

async function httpSaveNftImage(req, res) {
  console.log("Uploading file");
  console.log(req.file);

  const newPath = `src/uploads/${req.file.originalname}`;
  fs.rename(req.file.path, newPath, () => {
    //upload to cloudinary
    res.json({ fileName: `${req.file.originalname}` });
  });
}

module.exports = {
  httpSaveNftItem,
  httpGetAllNftItems,
  httpUpdateNftItem,
  httpNftItemAddBid,
  httpSaveNftImage,
};
