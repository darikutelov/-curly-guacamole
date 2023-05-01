const User = require("./user.mongo");

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
    const profile = await User.findById(id, { __v: 0 }).populate([
      "deliveryAddress",
      "invoiceAddress",
    ]);
    return { profile };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function updateUser(user) {
  try {
    const { upsertedCount, modifiedCount } = await User.updateOne(
      { _id: user._id },
      {
        avatarUrl: user.avatarUrl,
      },
      {
        upsert: true,
      }
    );

    const updatedUser = await User.findOne({ _id: user._id });
    updatedUser.password = undefined;
    console.log(updatedUser);
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
};
