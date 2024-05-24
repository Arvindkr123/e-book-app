import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      throw createHttpError(400, "All fields must be provided");
    }

    // Check if user already exists in the database
    const user = await UserModel.findOne({ email });
    if (user) {
      throw createHttpError(400, "User already exists with this email");
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });

    // Generate token
    const token = jwt.sign({ sub: newUser._id }, JWT_SECRET as string, {
      expiresIn: "7d",
    });

    // Respond with token
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
