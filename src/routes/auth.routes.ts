import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { validateAuth } from "../middlewares/auth.middleware.js";
import {
  loginSchema,
  registerSchema,
  forgotSchema,
} from "../validators/user.validator.js";
import {
  register,
  login,
  logout,
  renewTokens,
  deleteAccount,
  forgotPassword,
  resetPasswordForm,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/renew-tokens", renewTokens);
router.get("/logout", validateAuth, logout);
router.post("/login", validate(loginSchema), login);
router.post("/signup", validate(registerSchema), register);
router.delete("/account/delete", validateAuth, deleteAccount);
router.post("/account/forgot-password", validate(forgotSchema), forgotPassword);
router.get("/account/reset-password-form", resetPasswordForm);

export default router;
