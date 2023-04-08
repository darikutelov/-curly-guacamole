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
  return res.status(200).json(await saveItem(nftItem));
}

async function httpUpdateNftItem(req, res) {
  const { itemId } = req.params;
  const item = req.body;
  console.log("😀");
  console.log(item);
  console.log(itemId);

  try {
    await updateItem(itemId, item);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
}

module.exports = {
  httpSaveNftItem,
  httpGetAllNftItems,
  httpUpdateNftItem,
};
