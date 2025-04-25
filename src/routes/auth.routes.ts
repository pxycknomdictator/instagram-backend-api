import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { validateAuth } from "../middlewares/auth.middleware.js";
import { register, login, logout } from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../validators/user.validator.js";

const router = Router();

router.post("/signup", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/logout", validateAuth, logout);

export default router;
