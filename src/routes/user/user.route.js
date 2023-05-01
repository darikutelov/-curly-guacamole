const express = require("express");
const upload = require("../../services/multerSetup");

const {
  httpRegisterUser,
  httpLoginUser,
  httpGetProfile,
  httpSaveUserAvatar,
  httpUpdateUser,
} = require("./user.controller");

const userRouter = express.Router();

userRouter.get("/", httpGetProfile);
userRouter.post("/register", httpRegisterUser);
userRouter.post("/login", httpLoginUser);
userRouter.post("/update", httpUpdateUser);
userRouter.post("/images", upload.single("nft"), httpSaveUserAvatar);

module.exports = userRouter;
