import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { User } from "../models/userTypes";

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
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw createHttpError(400, "User already exists with this email");
      }
    } catch (error) {
      return next(createHttpError(500, "Error while getting user"));
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    let newUser: User;
    try {
      newUser = await UserModel.create({
        name,
        email,
        password: hashPassword,
      });
    } catch (error) {
      return next(createHttpError(500, "Error while creating user"));
    }

    try {
      // Generate token
      const token = jwt.sign({ sub: newUser._id }, JWT_SECRET as string, {
        expiresIn: "7d",
      });

      // Respond with token
      res.status(201).json({ token });
    } catch (error) {
      return next(createHttpError(500, "Error while sigining jwt token"));
    }
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(createHttpError(400, "All fields are required"));
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return next(createHttpError(404, "User not found"));
    }

    const isMathPassword = await bcrypt.compare(password, user.password);
    if (!isMathPassword) {
      return next(createHttpError(401, "Not authenticated"));
    }

    // generate token
    const token = jwt.sign({ sub: user._id }, JWT_SECRET as string, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    res.json({ accessToken: token });
  } catch (error) {
    next(error);
  }
};
