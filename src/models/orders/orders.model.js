const orders = require("./orders.mongo");
const users = require("../user/user.mongo");

async function addUserOrder(userId, order) {
  try {
    const createdOrder = await orders.create(order);

    if (createdOrder) {
      await users.updateOne(
        { _id: userId },
        { $push: { orders: createdOrder._id } }
      );

      return createdOrder;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Order was not saved");
  }
}

async function updateOrderStatus(orderId, status) {
  console.log({ status });
  try {
    const { upsertedCount, modifiedCount } = await orders.updateOne(
      {
        _id: orderId,
      },
      {
        status,
      }
    );
    return {
      success: !!(upsertedCount || modifiedCount),
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addUserOrder,
  updateOrderStatus,
};
