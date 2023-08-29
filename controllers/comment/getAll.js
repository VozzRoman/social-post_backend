import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { PostModel } from "../../model/postModel.js";
import { CommentsModel } from "../../model/commentsModel.js";

const getAllComments = asyncHandler(async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    throw createError(401, " unable to find id");
  }
  const commentsList = await Promise.all(
    post.comments.map((comment) => {
      return CommentsModel.findById(comment._id);
    })
  );
  res.status(201).json({ code: 201, message: "ok", commentsList });
});

export default getAllComments;
