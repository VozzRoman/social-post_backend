import { Schema, model, Types } from "mongoose";
import Joi from "joi";
import { handleMongooseError } from "../middleWare/mogoErrors.js";

const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new Schema(
  {
    avatar: {
      type: String,
      default: "",
    },
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
      minlength: 9,
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
userSchema.post("save", handleMongooseError);

export const signUpSchema = Joi.object({
  avatar: Joi.string().optional().allow(""),
  name: Joi.string().required().error(new Error("введіть будьласка ім'я")),
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    //  .error(new Error("введіть будьласка пошту")),
    .messages({
      "string.empty": `введіть будьласка пошту`,
      "string.pattern.base": `не вірний формат пошти`,
    }),
  password: Joi.string()
    .min(9)
    .required()
    //  .error(new Error("пароль мае бути не меньше 9 символів")),
    .messages({
      "string.empty": `введіть будьласка пароль`,
      "string.min": `пароль має містити не меньше 9 символів`,
    }),
});
export const signInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.empty": `введіть будьласка пошту`,
    "string.pattern.base": `не вірний формат пошти`,
  }),
  password: Joi.string().min(9).required().messages({
    "string.empty": `введіть будьласка пароль`,
    "string.min": `пароль має містити не меньше 9 символів`,
  }),
});

export const UserModel = model("user", userSchema);
