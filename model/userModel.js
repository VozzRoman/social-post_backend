import { Schema, model, Types } from "mongoose";
import Joi from "joi";

const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    posts: [
      {
        type: Types.ObjectId,
        ref: "post",
      },
    ],
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

export const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(9).required(),
});
export const signInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(9).required(),
});

export const UserModel = model("user", userSchema);
