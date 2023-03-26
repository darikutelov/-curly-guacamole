const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
  tokenName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  creator: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Categories",
  },
  nftCollection: {
    type: Schema.Types.ObjectId,
    ref: "Collections",
  },
  contractAddress: {
    type: String,
    required: true,
  },
  price: {
    type: Schema.Types.ObjectId,
    ref: "Prices",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  auctionExpiryDate: {
    type: Date,
    required: true,
  },
  bids: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bids",
      },
    ],
    default: [],
  },
});

itemSchema.virtual("id").get(function () {
  return this._id?.toHexString();
});

itemSchema.set("toJSON", {
  virtuals: true,
});

module.exports = model("Items", itemSchema);
