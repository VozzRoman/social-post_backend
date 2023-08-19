import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { PostModel } from "../../model/postModel.js";

const getAll = asyncHandler(async (req, res) => {
  const posts = await PostModel.find({});
  if (!posts) {
    throw createError(400, "не можливо створити пост");
  }

  res.json({ code: 200, status: "ok", data: posts });
});

export default getAll;
