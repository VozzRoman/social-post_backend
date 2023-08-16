import asyncHandler from "express-async-handler";
import createError from "http-errors";
import bcrypt from "bcryptjs";
import { UserModel } from "../../model/userModel.js";

const signUp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const candidate = await UserModel.findOne({ email });
  if (candidate) {
    throw createError(409, "user already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ ...req.body, password: hashPassword });
  if (!user) {
    throw createError(400, "unable create user");
  }
  res.status(201).json({
    code: 201,
    status: "ok",
    data: { name: user.name, email: user.email },
  });
});

export default signUp;
