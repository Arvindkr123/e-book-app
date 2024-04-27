import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user.models";
export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // validation
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields must be provided");
    return next(error);
  }

  // check user already exist in database
  const user = await UserModel.findOne({ email });
  if (user) {
    const error = createHttpError(400, "User already exists with this email");
    return next(error);
  }

  res.json({ msg: "user created" });
};
