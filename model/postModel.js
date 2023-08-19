import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    username: { type: String },
    title: { type: String, required: true },
    text: { type: String, required: true },
    imgUrl: { type: String, default: "" },
    views: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: "user" },
    comments: { type: Schema.Types.ObjectId, ref: "comments" },
  },
  { versionKey: false, timestamps: true }
);

export const PostModel = model("post", postSchema);
