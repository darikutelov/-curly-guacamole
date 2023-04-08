const items = require("./items.mongo");
const { savePrice, findExistingPriceId } = require("./price/price.model");

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
      likes,
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
        likes,
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

async function updateItem(itemId, nftItem) {
  console.log("🎉");
  try {
    let {
      tokenName,
      description,
      imageUrl,
      creator,
      category,
      nftCollection,
      contractAddress,
      likes,
      price: { cryptoCurrency, priceInCryptoCurrency },
      quantity,
      auctionExpiryDate,
      bids,
    } = nftItem;

    var priceId = await findExistingPriceId(
      cryptoCurrency,
      priceInCryptoCurrency
    );

    if (!priceId) {
      const savedPrice = await savePrice(cryptoCurrency, priceInCryptoCurrency);
      priceId = savedPrice._id;
    }

    const { upsertedCount, modifiedCount } = await items.updateOne(
      { _id: itemId },
      {
        tokenName,
        description,
        imageUrl,
        creator,
        category: category._id,
        nftCollection: nftCollection._id,
        contractAddress,
        likes,
        price: priceId,
        quantity,
        auctionExpiryDate,
        bids,
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
    throw new Error("Item not saved!");
  }
}

module.exports = {
  getAllItems,
  saveItem,
  updateItem,
};
