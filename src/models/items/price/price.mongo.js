const { Schema, model } = require("mongoose");

const priceSchema = new Schema({
  cryptoCurrency: {
    type: String,
    required: true,
  },
  priceInCryptoCurrency: {
    type: Number,
    required: true,
  },
});

module.exports = model("Prices", priceSchema);
