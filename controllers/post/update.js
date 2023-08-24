import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { PostModel } from "../../model/postModel.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, text } = req.body;
  if (req.files) {
    let fileName = Date.now().toString() + req.files.imgUrl.name; //формеруем імя картінкі которая пріходіт с фронтенда
    console.log(fileName);
    const _dirname = dirname(fileURLToPath(import.meta.url)); //папка в которой ми находімся (controllers/post)
    req.files.imgUrl.mv(path.join(_dirname, "..", "..", "uploads", fileName)); //переносім файл в папку uploads

    const post = await PostModel.findByIdAndUpdate(
      id,
      { title, text, imgUrl: fileName },
      { new: true }
    );
    return res.json({ status: "update", post });
  }
  const post = await PostModel.findByIdAndUpdate(
    id,
    { title, text, imgUrl: "" },
    { new: true }
  );
  res.json({ status: "update", post });
});

export default update;
