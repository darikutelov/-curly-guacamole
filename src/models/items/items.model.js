const items = require("./items.mongo");
const { savePrice, findExistingPriceId } = require("./price/price.model");

async function getAllItems() {
  return await items
    .find({}, { __v: 0 })
    .sort({ _id: -1 })
    .populate({
      path: "bids",
      populate: [
        {
          path: "user",
          model: "User",
          select: "username email avatarUrl",
        },
        {
          path: "price",
          model: "Prices",
        },
      ],
    })
    .populate("category nftCollection price");
  // .populate("category nftCollection price bids")
  // .populate("bids.user bids.price");
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

    const createdItem = await items
      .findOne({ tokenName: tokenName })
      .populate("category nftCollection price bids");

    return createdItem;
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

    const updatedItem = await items
      .findByIdAndUpdate(
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
        }
      )
      .populate("category nftCollection price bids");
    return updatedItem;
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
