import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { validateAuth } from "../middlewares/auth.middleware.js";
import {
  loginSchema,
  registerSchema,
  forgotSchema,
  resetPasswordSchema,
} from "../validators/user.validator.js";
import {
  register,
  login,
  logout,
  renewTokens,
  deleteAccount,
  forgotPassword,
  resetPasswordForm,
  resetPassword,
  verifyEmail,
  getVerified,
  getCodeAndVerify,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/renew-tokens", renewTokens);
router.get("/logout", validateAuth, logout);
router.post("/login", validate(loginSchema), login);
router.post("/signup", validate(registerSchema), register);
router.delete("/account/delete", validateAuth, deleteAccount);
router.get("/account/reset-password-form", resetPasswordForm);
router.post("/account/forgot-password", validate(forgotSchema), forgotPassword);
router.post("/account/verify-by-code", getCodeAndVerify);
router
  .route("/account/verify-email")
  .get(getVerified)
  .post(validateAuth, verifyEmail);

router
  .route("/account/reset-password")
  .post(validate(resetPasswordSchema), resetPassword);

export default router;
