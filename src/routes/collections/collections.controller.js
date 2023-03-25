const {
  getAllCollections,
  saveCollection,
} = require("../../models/collection/collections.model");

async function httpGetAllCollections(req, res) {
  const collections = await getAllCollections();
  const collectionsNoMongoID = collections.map((collection) => {
    console.log(collection);
    return {
      id: collection.id,
      name: collection.name,
      imageUrl: collection.imageUrl,
      description: collection.description,
      contractAddress: collection.contractAddress,
      numberOfItems: collection.numberOfItems,
      createdAt: collection.createdAt,
      category: collection.category.name,
      totalVolume: collection.totalVolume,
      floorPrice: collection.floorPrice,
      owners: collection.owners,
    };
  });

  return res.status(200).json(collectionsNoMongoID);
}

async function httpSaveCollection(req, res) {
  const { collection } = req.body;
  return res.status(200).json(await saveCollection(collection));
}

module.exports = {
  httpGetAllCollections,
  httpSaveCollection,
};
