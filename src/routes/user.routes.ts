import { Router } from "express";
import { validateAuth } from "../middlewares/auth.middleware.js";
import { currentUser, getUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/profile/current-user", validateAuth, currentUser);
router.get("/profile/:username", getUser);

export default router;
