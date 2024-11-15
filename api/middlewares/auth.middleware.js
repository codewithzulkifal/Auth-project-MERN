import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return next(createError(401, "you are not Authenticated"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(createError(403, "Invalid Token"));
    }

    req.user = user;
    next();
  });
};