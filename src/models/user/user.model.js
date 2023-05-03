const User = require("./user.mongo");
const items = require("../items/items.mongo");

async function createUser(userData) {
  const { uid, email, password, username } = userData;
  return await User.create({
    email: email.toLowerCase(),
    password,
    uid,
    username,
  });
}

//TODO: delete
async function findUserByUidAndEmail(userData) {
  const { uid, email } = userData;
  return await User.findOne({ uid, email });
}

async function findUserByEmail(email) {
  return await User.findOne({ email });
}

async function findProfileByUid(uid) {
  try {
    const profile = await User.findOne({ uid }, { __v: 0 }).populate([
      "deliveryAddress",
      "invoiceAddress",
    ]);
    return { profile };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function findProfileById(id) {
  try {
    const profile = await User.findById(id, { __v: 0 }).populate("orders");
    return { profile };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getUserNftItems(userId) {
  try {
    const profile = await User.findById(userId, { __v: 0 }).populate("orders");

    let orderItemsIds = profile.orders
      .map((order) => {
        return order.items.map((item) => {
          return item._id;
        });
      })
      .flat();

    let itemsUrls = orderItemsIds.map(async (id) => {
      const nft = await items.findById(id);
      return {
        id: id,
        imageUrl: nft.imageUrl,
      };
    });

    return await Promise.all(itemsUrls);
  } catch (error) {
    throw new Error(error);
  }
}

async function updateUser(user) {
  try {
    const { upsertedCount, modifiedCount } = await User.updateOne(
      { _id: user._id },
      {
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
        walletAddress: user.walletAddress,
        wallet: user.wallet,
      },
      {
        upsert: true,
      }
    );

    const updatedUser = await User.findOne({ _id: user._id });
    updatedUser.password = undefined;
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new Error("User not updated!");
  }
}

module.exports = {
  findUserByEmail,
  createUser,
  findProfileById,
  findProfileByUid,
  findUserByUidAndEmail,
  updateUser,
  getUserNftItems,
};
