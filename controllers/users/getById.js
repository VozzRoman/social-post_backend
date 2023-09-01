import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { UserModel } from "../../model/userModel.js";
import { isValidObjectId } from "mongoose";
const getById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("ID-->", id);
  if (!isValidObjectId(id)) {
    throw createError(400, "id is not valid");
  }
  const user = await UserModel.findById(id);
  console.log("GetByIs", user);
  if (!user) {
    throw createError(401, "unable to find post");
  }
  console.log("getByID");
  res.status(200).json({ code: 200, message: "ok", user });
});

export default getById;
