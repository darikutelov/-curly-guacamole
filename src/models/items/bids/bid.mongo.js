const { Schema, model } = require("mongoose");

const bidSchema = new Schema({
  price: {
    type: Schema.Types.ObjectId,
    ref: "Prices",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

bidSchema.virtual("id").get(function () {
  return this._id?.toHexString();
});

bidSchema.set("toJSON", {
  virtuals: true,
});

module.exports = model("Bids", bidSchema);
