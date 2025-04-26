import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { validateAuth } from "../middlewares/auth.middleware.js";
import { loginSchema, registerSchema } from "../validators/user.validator.js";
import {
  register,
  login,
  logout,
  renewTokens,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/logout", validateAuth, logout);
router.post("/renew-tokens", renewTokens);

export default router;
