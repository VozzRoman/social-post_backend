import createError from "http-errors";
import jwt from "jsonwebtoken";
import { UserModel } from "../model/userModel.js";
export const authinticate = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(createError(401, "invalid token"));
  }
  try {
    const { id } = jwt.verify(token, process.env.SECRET__KEY);
    const user = await UserModel.findById(id);
    req.user = user;
    if (!user || !user.token || user.token !== token) {
      next(createError(401, "token false"));
    }
    next();
  } catch (error) {}
};
