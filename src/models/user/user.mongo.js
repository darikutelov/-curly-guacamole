const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    default: "Anonymous",
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  token: {
    type: String,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  walletAddress: {
    type: String,
    trim: true,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
  cart: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Items" },
      quantity: { type: Number, min: 1, required: true },
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("User", userSchema);
