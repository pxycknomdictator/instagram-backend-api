import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { registerBodyValidateMiddleware } from "../middlewares/body.middleware.js";

const router = Router();

router.post("/signup", registerBodyValidateMiddleware, register);

export default router;
