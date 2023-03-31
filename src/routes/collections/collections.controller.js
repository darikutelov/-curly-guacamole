const {
  getAllCollections,
  saveCollection,
} = require("../../models/collection/collections.model");

async function httpGetAllCollections(req, res) {
  return res.status(200).json(await getAllCollections());
}

async function httpSaveCollection(req, res) {
  const { collection } = req.body;
  return res.status(200).json(await saveCollection(collection));
}

module.exports = {
  httpGetAllCollections,
  httpSaveCollection,
};
