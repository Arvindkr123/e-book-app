import express, { Request, Response } from "express";
import createHttpError from "http-errors";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app = express();

app.get("/", (req: Request, res: Response) => {
  const error = createHttpError(400, "Something went wrong");
  throw error;
  res.send("hello world");
});

app.use(globalErrorHandler);

export default app;
