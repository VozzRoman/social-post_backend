import { UserModel } from "../../model/userModel.js";
import asyncHandler from "express-async-handler";
const logout = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  await UserModel.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "logout success",
  });
});

export default logout;
