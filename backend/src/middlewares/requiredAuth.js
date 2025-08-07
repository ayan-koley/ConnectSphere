import { ApiError } from "../utils/ApiError.js";
import { getAuth } from "@clerk/express";

export const requiredAuth = (req, res, next) => {
  const auth = getAuth(req);
  req.auth = auth;
  // req.auth = {
  //   userId: "user_30PI3nlqdg2kCh4X81elGYJRQQq",
  // };
  if (!req.auth || !req.auth.userId) {
    return res.json(new ApiError(401, "Unauthorized rquest"));
  }
  next();
};
