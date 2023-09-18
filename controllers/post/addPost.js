import { UserModel } from "../../model/userModel.js";
import { PostModel } from "../../model/postModel.js";
import { v4 } from "uuid";
import createError from "http-errors";
import asyncHandler from "express-async-handler";
import path, { dirname } from "path";
// import { fileURLToPath } from "url";
import cloudinary from "../../cloudinary/cloudinary.js";
import fs from "fs/promises";
import { checkType } from "../../middleWare/checkType.js";
const addPost = asyncHandler(async (req, res) => {
  const { title, text } = req.body;
  const user = await UserModel.findById(req.user._id);
  console.log("USER", user.avatar);
  if (req.files) {
    const type = req.files.imgUrl.mimetype;
    checkType(type); //фільтр на тип файлу

    let fileName = v4() + req.files.imgUrl.name; //формеруем імя картінкі которая пріходіт с фронтенда
    const filePath = path.resolve("uploads", fileName); //папка в которой ми находімся (controllers/post)

    req.files.imgUrl.mv(filePath);
    console.log("local", filePath);
    const newPath = await cloudinary.uploader.upload(filePath, {
      folder: "imaginarium",
      transformation: {
        width: 1200,

        crop: "scale",
        quality: "auto",
        fetch_format: "webp",
      },
    });
    console.log("CloudyPath", newPath.secure_url);
    fs.unlink(filePath);

    const postWithImage = await PostModel.create({
      username: user.name,
      avatar: user.avatar,
      title,
      text,
      imgUrl: newPath.secure_url,
      author: req.user._id,
    });
    console.log(postWithImage);
    //пушім в модель Юзера
    await UserModel.findByIdAndUpdate(req.user._id, {
      $push: { posts: postWithImage },
    });
    return res
      .status(201)
      .json({ status: "ok", code: 201, data: postWithImage });
  }
  const postNoImage = await PostModel.create({
    username: user.name,
    avatar: user.avatar,
    title,
    text,
    imgUrl: "",
    author: req.user._id,
  });
  //пушім в модель Юзера
  await UserModel.findByIdAndUpdate(req.user._id, {
    $push: { posts: postNoImage },
  });
  res.status(201).json({ status: "ok", code: 201, data: postNoImage });
});

export default addPost;
