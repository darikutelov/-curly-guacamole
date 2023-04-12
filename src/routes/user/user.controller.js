const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  createUser,
  findProfileById,
  findProfileByUid,
  findUserByUidAndEmail,
} = require("../../models/user/user.model");

async function httpRegisterUser(req, res) {
  try {
    const { email, password, uid } = req.body;

    if (!(email && password && uid)) {
      return res.status(400).send("All input is required");
    }

    const existingUser = await findUserByUidAndEmail({ email, uid });

    if (existingUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({ uid, email, password: encryptedPassword });

    const token = jwt.sign(
      { user_id: user._id, user_uid: user.uid, email },
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
    const { email, uid, password } = req.body;

    if (!(email && password && uid)) {
      return res.status(400).send("All input is required");
    }

    const user = await findUserByUidAndEmail({ email, uid });

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
  const uid = req.query.uid;
  let profile;
  if (uid) {
    profile = await findProfileByUid(uid);
  }

  if (id) {
    profile = await findProfileById(id);
  }

  if (profile) {
    return res.status(201).json(profile);
  } else {
    return res.status(400).json({ error: "Няма такъв профил!" });
  }
}

module.exports = {
  httpLoginUser,
  httpGetProfile,
  httpRegisterUser,
};
