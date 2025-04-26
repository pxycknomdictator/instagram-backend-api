import { Router } from "express";
import { validateAuth } from "../middlewares/auth.middleware.js";
import {
  currentUser,
  getFollowers,
  getUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/profile/:username", getUser);
router.get("/:username/followers", validateAuth, getFollowers);
router.get("/profile/current-user", validateAuth, currentUser);

export default router;
