import { Router } from "express";
import { validateAuth } from "../middlewares/auth.middleware.js";
import {
  changePassword,
  currentUser,
  getFollowers,
  getFollowing,
  getUser,
  updateAvatar,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { passwordsSchema } from "../validators/user.validator.js";

const router = Router();

router.get("/profile/:username", getUser);
router.get("/:username/followers", validateAuth, getFollowers);
router.get("/:username/following", validateAuth, getFollowing);
router.get("/profile/current-user", validateAuth, currentUser);
router.patch("/profile/avatar", validateAuth, updateAvatar);
router.put(
  "/profile/change-password",
  validateAuth,
  validate(passwordsSchema),
  changePassword,
);

export default router;
