import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { PostModel } from "../../model/postModel.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { checkType } from "../../middleWare/checkType.js";
import { v4 } from "uuid";
import cloudinary from "../../cloudinary/cloudinary.js";
import fs from "fs/promises";

const update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, text, imgUrl } = req.body;
  if (req.files) {
    const type = req.files.imgUrl.mimetype;
    checkType(type);

    let fileName = v4() + req.files.imgUrl.name; //формеруем імя картінкі которая пріходіт с фронтенда
    console.log("FILE NAME", fileName);
    const filePath = path.resolve("uploads", fileName); //папка в которой ми находімся (controllers/post)
    req.files.imgUrl.mv(filePath); //переносім файл в папку uploads
    console.log("local", filePath);
    const newPath = await cloudinary.uploader.upload(filePath, {
      folder: "imaginarium",
    });
    console.log("CloudyPath", newPath.secure_url);
    fs.unlink(filePath);
    const post = await PostModel.findByIdAndUpdate(
      id,
      {
        title,
        text,
        imgUrl: newPath.secure_url,
        avatar: req.user.avatar,
        username: req.user.name,
      },
      { new: true }
    );
    console.log("Post", post);
    return res.json({ status: "update", post });
  }
  const post = await PostModel.findByIdAndUpdate(
    id,
    {
      title,
      text,
      imgUrl,
      avatar: req.user.avatar,
      username: req.user.name,
    },
    { new: true }
  );
  console.log("IMAGE NO", post);
  res.json({ status: "update", post });
});

export default update;
