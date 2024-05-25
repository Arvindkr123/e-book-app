import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

export const createBookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({ msg: "ok" });
  } catch (error) {
    next(createHttpError(500, "Error Creating the book"));
  }
};
