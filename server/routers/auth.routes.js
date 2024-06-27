const express = require("express");
const { loginUser, registerUser, updateUser } = require("../controllers/auth");
const { verifyToken } = require("../middleware/VerifyToken");
const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.patch("/updateUser", verifyToken, updateUser);
module.exports = userRouter;
