const fs = require("fs");
const cloudinary = require("../../services/cloudinarySetup");

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
  const nftItem = req.body;
  console.log("😀");
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
  const newPath = `src/uploads/${req.file.originalname}`;
  fs.rename(req.file.path, newPath, () => {
    cloudinary.uploader.upload(
      `${newPath}`,
      { folder: "nftio/nftItems" },
      function (err, image) {
        if (err) {
          console.warn(err);
          res.status(400).send("Error uploading file to cloud!");
          return;
        }
        console.log(image);
        const filePath = image.secure_url.split("/");
        const imageFileName = filePath[filePath.length - 1];
        console.log(imageFileName);
        res.status(200).json({ fileName: imageFileName });
      }
    );
  });
}

module.exports = {
  httpSaveNftItem,
  httpGetAllNftItems,
  httpUpdateNftItem,
  httpNftItemAddBid,
  httpSaveNftImage,
};
