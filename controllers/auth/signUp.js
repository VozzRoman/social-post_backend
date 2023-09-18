import asyncHandler from "express-async-handler";
import createError from "http-errors";
import bcrypt from "bcryptjs";
import { UserModel } from "../../model/userModel.js";
import { checkType } from "../../middleWare/checkType.js";
import { v4 } from "uuid";
import path from "path";
import cloudinary from "../../cloudinary/cloudinary.js";
import fs from "fs/promises";

const signUp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const candidate = await UserModel.findOne({ email });
  if (candidate) {
    throw createError(409, "такий користувач вже існуе");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  if (req.files) {
    const type = req.files.avatar.mimetype;
    console.log("AVA", type);
    checkType(type);
    const fileName = v4() + req.files.avatar.name;

    const filePath = path.resolve("uploads", fileName);

    req.files.avatar.mv(filePath);
    const newPath = await cloudinary.uploader.upload(filePath, {
      folder: "avatars",
      transformation: {
        width: 180,
        height: 180,
        crop: "fill",
        fetch_format: "webp",
      },
    });
    console.log("NewPath", newPath);

    fs.unlink(filePath);
    const user = await UserModel.create({
      ...req.body,
      password: hashPassword,
      avatar: newPath.secure_url,
    });
    if (!user) {
      throw createError(400, "unable create user");
    }
    return res.status(201).json({
      code: 201,
      status: "ok",
      data: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        message: "registration was successful",
      },
    });
  }
  const user = await UserModel.create({
    ...req.body,
    password: hashPassword,
    avatar: "",
  });
  if (!user) {
    throw createError(400, "unable create user");
  }
  res.status(201).json({
    code: 201,
    status: "ok",
    data: {
      name: user.name,
      email: user.email,
      message: "registration was successful",
    },
  });
});

export default signUp;
