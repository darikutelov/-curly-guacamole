const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cloudinary = require("../../services/cloudinarySetup");

const {
  createUser,
  findProfileById,
  findProfileByUid,
  findUserByUidAndEmail,
  findUserByEmail,
  updateUser,
  getUserNftItems,
} = require("../../models/user/user.model");

async function httpRegisterUser(req, res) {
  console.log("🎯");
  try {
    const { email, password, username } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      email,
      password: encryptedPassword,
      username,
    });

    const token = jwt.sign(
      { user_id: user._id, user_uid: email },
      process.env.JWT_TOKEN_KEY,
      {
        expiresIn: "48h",
      }
    );

    //user.token = token;
    //   res.cookie(`Cookie token name`, `encrypted cookie string Value`, {
    //     maxAge: 5000,
    //     // expires works the same as the maxAge
    //     expires: new Date("01 12 2021"),
    //     secure: true,
    //     httpOnly: true,
    //     sameSite: "lax",
    //   });
    res.cookie("AuthToken", token);
    user.password = undefined;
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

async function httpLoginUser(req, res) {
  console.log("🎯");
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    const user = await findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_TOKEN_KEY,
        {
          expiresIn: "48h",
        }
      );
      //user.token = token;
      res.cookie("AuthToken", token);
      user.password = undefined;
      return res.status(200).json(user);
    }

    res.status(400).send("Invalid Credentials");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

async function httpGetProfile(req, res) {
  const id = req.query.id;
  let profile;

  if (id) {
    profile = await findProfileById(id);
  }

  if (profile) {
    return res.status(201).json(profile);
  } else {
    return res.status(400).json({ error: "No such profile!" });
  }
}

async function httpSaveUserAvatar(req, res) {
  const newPath = `src/uploads/${req.file.originalname}`;

  fs.rename(req.file.path, newPath, () => {
    cloudinary.uploader.upload(
      `${newPath}`,
      { folder: "nftio/users" },
      function (err, image) {
        if (err) {
          console.warn(err);
          res.status(400).send("Error uploading file to cloud!");
          return;
        }
        const filePath = image.secure_url.split("/");
        const imageFileName = filePath[filePath.length - 1];
        res.status(200).json({ fileName: imageFileName });
      }
    );
  });
}

async function httpUpdateUser(req, res) {
  console.log("Update user");
  const user = req.body;
  console.log(user);
  try {
    res.status(200).json(await updateUser(user));
  } catch (error) {
    res.sendStatus(400);
  }
}

async function httpUserNftItems(req, res) {
  const { userId } = req.params;
  try {
    res.status(200).json(await getUserNftItems(userId));
  } catch (error) {
    res.sendStatus(400);
  }
}

module.exports = {
  httpLoginUser,
  httpGetProfile,
  httpRegisterUser,
  httpSaveUserAvatar,
  httpUpdateUser,
  httpUserNftItems,
};
