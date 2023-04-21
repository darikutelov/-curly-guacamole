const items = require("./items.mongo");
const bids = require("./bid.mongo");
const users = require("../../user/user.mongo");
const { savePrice } = require("../price/price.model");

const { savePrice } = require("./price/price.model");

async function addBid(req, itemId, bid) {
  const { userId, cryptoCurrency, priceInCryptoCurrency } = bid;

  const user = await users.findById(userId);

  if (!user) {
    throw new Error("No such user!");
  }

  if (req.user._id != user._id) {
    throw new Error("You can't add bid for this user!");
  }

  const item = await items.findById(itemId);

  if (!item) {
    throw new Error("Item does not exist!");
  }

  const hasCurrentUserBid = item.bids.find((bid) => bid.user._id == user._id);

  if (hasCurrentUserBid) {
    throw new Error("You already have a bid for this item!");
  }

  try {
    const price = await savePrice(cryptoCurrency, priceInCryptoCurrency);

    let bid = await bids.create({
      price,
      user,
    });

    const { _, modifiedCount } = await items.updateOne(
      { _id: item._id },
      { $push: { bids: bid } }
    );

    if (modifiedCount > 0) {
      return await items.findById(item._id);
    }
  } catch {
    throw new Error("Bid was not saved!");
  }
}

module.exports = {
  addBid,
};
