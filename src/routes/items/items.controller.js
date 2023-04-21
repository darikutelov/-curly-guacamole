const {
  saveItem,
  getAllItems,
  updateItem,
} = require("../../models/items/items.model");

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

async function httpNftItemAddBid(res, req) {
  const { itemId } = req.params;
  const { bid } = req.body;
  console.log("😀");
}

module.exports = {
  httpSaveNftItem,
  httpGetAllNftItems,
  httpUpdateNftItem,
  httpNftItemAddBid,
};
