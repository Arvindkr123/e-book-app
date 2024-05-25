import { Router } from "express";
import { createBookController } from "../controllers/book.controllers";
const router = Router();

router.post("/", createBookController);

export default router;
