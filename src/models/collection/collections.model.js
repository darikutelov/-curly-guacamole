const collections = require("./collections.mongo");

async function getAllCollections() {
  return await collections.find({}, { __v: 0 }).sort({ totalVolume: -1 });
}

async function saveCollection(collection) {
  try {
    let {
      name,
      description,
      imageUrl,
      contractAddress,
      numberOfItems,
      createdAt,
      totalVolume,
      floorPrice,
      owners,
    } = collection;

    const { upsertedCount, modifiedCount } = await collections.updateOne(
      { name },
      {
        description,
        imageUrl,
        contractAddress,
        numberOfItems,
        createdAt,
        totalVolume,
        floorPrice,
        owners,
      },
      {
        upsert: true,
      }
    );
    return {
      success: !!(upsertedCount || modifiedCount),
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllCollections,
  saveCollection,
};
