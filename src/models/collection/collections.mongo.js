const { Schema, model } = require("mongoose");

const collectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  contractAddress: {
    type: String,
    required: true,
  },
  numberOfItems: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Categories",
  },
  totalVolume: {
    type: Number,
    default: 0,
  },
  floorPrice: {
    type: Number,
    required: true,
  },
  owners: {
    type: Number,
    default: 1,
  },
});

collectionSchema.virtual("id").get(function () {
  return this._id?.toHexString();
});

collectionSchema.set("toJSON", {
  virtuals: true,
});

module.exports = model("Collections", collectionSchema);
