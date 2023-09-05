import { Schema, model } from "mongoose";

const commentsSchema = new Schema(
  {
    body: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
    },
    author: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

export const CommentsModel = model("comment", commentsSchema);
