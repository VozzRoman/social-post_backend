import asyncHandler from "express-async-handler";
import createError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../../model/userModel.js";

const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const candidate = await UserModel.findOne({ email });
  //   console.log("CANDIADAT", candidate);
  if (!candidate) {
    throw createError(409, "пароль обо email не вірний");
  }
  const comparePassword = bcrypt.compare(password, candidate.password);
  if (!comparePassword) {
    throw createError(409, "пароль обо email не вірний");
  }
  const payload = {
    id: candidate._id,
  };
  const token = jwt.sign(payload, process.env.SECRET__KEY, {
    expiresIn: "23h",
  });

  await UserModel.findByIdAndUpdate(candidate._id, { token });

  res.status(201).json({
    code: 201,
    status: "ok",
    data: {
      avatar: candidate.avatar,
      name: candidate.name,
      token: token,
      email: candidate.email,
      _id: candidate._id,
      posts: candidate.posts,
    },
  });
});

export default signIn;
