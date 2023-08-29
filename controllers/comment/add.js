import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { CommentsModel } from "../../model/commentsModel.js";
import { PostModel } from "../../model/postModel.js";
import { isValidObjectId } from "mongoose";

const createComment = asyncHandler(async (req, res) => {
  console.log("REQ-->", req.body);
  const { id } = req.params;
  console.log(req.user.name);
  const { body } = req.body;
  console.log(id);
  const comment = await CommentsModel.create({
    body,
    username: req.user.name,
    avatar: req.user.avatar,
  });
  if (!comment) {
    throw createError(400, "не можливо створити відгуки");
  }
  if (!isValidObjectId(id)) {
    throw createError(400, "id is not valid");
  }
  const post = await PostModel.findByIdAndUpdate(id, {
    $push: { comments: comment._id },
  });
  if (!post) {
    throw createError(401, "unable to find id");
  }

  res.status(201).json({ code: 201, status: "ok", comment });
});

export default createComment;
