import { Router } from "express";
import { createBookController } from "../controllers/book.controllers";
import multer from "multer";
import path from "node:path";
const router = Router();

const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: {
    fieldSize: 3e7,
  },
});

router.post(
  "/",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBookController
);

export default router;
