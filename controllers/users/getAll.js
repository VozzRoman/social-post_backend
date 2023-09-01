import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { UserModel } from "../../model/userModel.js";
const getAll = asyncHandler(async (req, res) => {
  console.log("getALl");
  const users = await UserModel.find({});
  console.log("USERS-->", users);
  if (!users) {
    throw createError(401, "unable to get users");
  }

  res.status(200).json({ code: 200, message: "ok", users });
});

export default getAll;
