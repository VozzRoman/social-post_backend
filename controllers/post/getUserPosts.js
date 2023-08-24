import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { PostModel } from "../../model/postModel.js";
import { UserModel } from "../../model/userModel.js";

const getUserPost = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  const list = await Promise.all(
    user.posts.map((post) => {
      return PostModel.findById(post._id);
    })
  );

  if (!list) {
    throw createError(400, "постів немае");
  }

  res.status(200).json({
    code: 200,
    status: "ok",
    list,
  });
});

export default getUserPost;
