import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { PostModel } from "../../model/postModel.js";
import { isValidObjectId } from "mongoose";
import { UserModel } from "../../model/userModel.js";

const remove = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw createError(400, "invalid id");
  }
  const post = await PostModel.findByIdAndDelete(id);
  if (!post) {
    throw createError(401, "unable to find id");
  }
  //удаляем потсти із массіва юзера!!
  await UserModel.findByIdAndUpdate(req.user._id, {
    $pull: { posts: req.params.id },
  });
  res.status(202).json({ status: "remove", id: post._id });
});

export default remove;
