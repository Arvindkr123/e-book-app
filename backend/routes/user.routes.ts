import { Router } from "express";
import { createUserController } from "./../controllers/user.controllers";
const router = Router();

router.post("/register", createUserController);

export default router;
