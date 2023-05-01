const { Schema, model } = require("mongoose");
const { AutoIncrement } = require("../../services/mongo");

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  items: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: "items",
      },
      price: {
        type: Schema.Types.ObjectId,
        ref: "prices",
      },
      quantity: {
        type: Number,
        requried: true,
        min: 0,
      },
    },
  ],
  payment: {
    type: String,
    enum: ["0", "1", "2", "3"],
    default: "0",
  },
  note: {
    type: String,
  },
  status: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "AWAITINGPAYMENT", "COMPLETED", "CANCELLED"],
    default: "PENDING",
  },
});

module.exports = model("Order", OrderSchema);
