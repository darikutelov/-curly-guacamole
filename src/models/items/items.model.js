const items = require("./items.mongo");
const { savePrice } = require("./price/price.model");

async function getAllItems() {
  return await items
    .find({}, { __v: 0 })
    .sort({ collection: 1 })
    .populate("category nftCollection price");
}

async function saveItem(nftItem) {
  try {
    let {
      tokenName,
      description,
      imageUrl,
      creator,
      category,
      nftCollection,
      contractAddress,
      price: { cryptoCurrency, priceInCryptoCurrency },
      quantity,
      auctionExpiryDate,
    } = nftItem;

    const savedPrice = await savePrice(cryptoCurrency, priceInCryptoCurrency);

    const { upsertedCount, modifiedCount } = await items.updateOne(
      { tokenName },
      {
        description,
        imageUrl,
        creator,
        category,
        nftCollection,
        contractAddress,
        price: savedPrice._id,
        quantity,
        auctionExpiryDate,
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
  getAllItems,
  saveItem,
};
