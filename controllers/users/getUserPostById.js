import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { UserModel } from "../../model/userModel.js";
import { PostModel } from "../../model/postModel.js";
import { isValidObjectId } from "mongoose";

const getUserPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw createError(400, "id is not valid");
  }
  const user = await UserModel.findById(id);
  if (!user) {
    throw createError(401, "unable find id");
  }
  const listPost = await Promise.all(
    user.posts.map((post) => {
      return PostModel.findById(post._id);
    })
  );
  if (!listPost) {
    throw createError(401, "unable to find posts");
  }

  res
    .status(200)
    .json({
      code: 200,
      message: "ok",
      data: { name: user.name, avatar: user.avatar, email: user.email },
      listPost,
    });
});

export default getUserPostById;
