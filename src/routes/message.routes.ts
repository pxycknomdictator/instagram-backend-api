import { Router } from "express";
import { validateAuth } from "../middlewares/auth.middleware.js";
import { conversations } from "../controllers/message.controller.js";

const router = Router();

router.get("/:username", validateAuth, conversations);

export default router;
