import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { validateRegister } from "../middlewares/body.middleware.js";

const router = Router();

router.post("/signup", validateRegister, register);

export default router;
