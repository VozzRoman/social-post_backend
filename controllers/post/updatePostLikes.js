import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { PostModel } from "../../model/postModel.js";
import { isValidObjectId } from "mongoose";

const updatePostLikes = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!isValidObjectId(id)) {
    throw createError(400, "invalid id");
  }
  const { like } = req.body;
  const data = await PostModel.findByIdAndUpdate(id, { like }, { new: true });
  if (!data) {
    throw createError(401, "unable to find id");
  }
  res.status(200).json({ message: "ok", data });
});

export default updatePostLikes;
