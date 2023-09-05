import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { PostModel } from "../../model/postModel.js";

const getAll = asyncHandler(async (req, res) => {
  const posts = await PostModel.find({}).sort("-createdAt");
  const popularPosts = await PostModel.find({}).limit(6);
  if (!posts) {
    throw createError(400, "пости відсутні");
  }

  res.json({
    code: 200,
    status: "ok",
    posts,
    popularPosts,
  });
});

export default getAll;
