import { Schema, model } from "mongoose";

const commentsSchema = new Schema({
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
});

export const CommentsModel = model("comment", commentsSchema);
