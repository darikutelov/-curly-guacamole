const express = require("express");
const {
  httpRegisterUser,
  httpLoginUser,
  httpGetProfile,
} = require("./user.controller");

const userRouter = express.Router();

userRouter.get("/", httpGetProfile);
userRouter.post("/register", httpRegisterUser);
userRouter.post("/login", httpLoginUser);

module.exports = userRouter;
