import asyncHandler from "express-async-handler";
import createError from "http-errors";
import cloudinary from "../../cloudinary/cloudinary.js";
import path, { dirname } from "path";
import { v4 } from "uuid";
import { checkType } from "../../middleWare/checkType.js";
import fs from "fs/promises";
import { UserModel } from "../../model/userModel.js";

const patchAvatar = asyncHandler(async (req, res) => {
  //   console.log("REQ-USER-->", req.user);

  if (req.files) {
    //  console.log("AVATAR", req.files);
    const type = req.files.avatar.mimetype;

    checkType(type);
    const fileName = v4() + req.files.avatar.name;
    //  console.log(fileName);

    const filePath = path.resolve("uploads", fileName);

    req.files.avatar.mv(filePath);
    const newPath = await cloudinary.uploader.upload(filePath, {
      folder: "avatars",
      transformation: {
        width: 180,
        height: 180,
        crop: "fill",
      },
    });
    //  console.log("NewPath", newPath);
    fs.unlink(filePath);

    const userUpdate = await UserModel.findByIdAndUpdate(
      req.user._id,
      { avatar: newPath.secure_url },
      { new: true }
    );
    if (!userUpdate) {
      throw createError(401, "unable to find id");
    }
    res.status(200).json({ code: 200, status: "ok", userUpdate });
  }
});

export default patchAvatar;
