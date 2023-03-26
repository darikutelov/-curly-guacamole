const { Schema, model } = require("mongoose");
const { AutoIncrement } = require("../../services/mongo");

const OrderSchema = new Schema({
  orderNumber: {
    type: Number,
  },
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
      itemId: {
        type: Schema.Types.ObjectId,
        ref: "items",
      },
      tokenName: {
        type: String,
      },
      imageUrl: {
        type: String,
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

OrderSchema.pre("save", async function (next) {
  var doc = this;
  const currentNumberOfOrders = await Order.countDocuments();

  console.log(currentNumberOfOrders);
  this.orderNumber = currentNumberOfOrders + 1;

  next();
});

const Order = model("Order", OrderSchema);
module.exports = Order;
