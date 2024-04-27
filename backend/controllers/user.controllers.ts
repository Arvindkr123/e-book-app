import { Request, Response } from "express";
export const createUserController = async (req: Request, res: Response) => {
  res.json({ msg: "user created" });
};
