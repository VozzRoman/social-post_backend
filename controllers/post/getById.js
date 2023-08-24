import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { PostModel } from "../../model/postModel.js";
import { isValidObjectId } from "mongoose";

const getById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw createError(400, "id is not valid");
  }
  const post = await PostModel.findByIdAndUpdate(id, {
    $inc: { views: 1 },
  });
  console.log(post);
  if (!post) {
    throw createError(401, "unable to find post");
  }
  res.status(200).json({ code: 200, status: "ok", data: post });
});

export default getById;
