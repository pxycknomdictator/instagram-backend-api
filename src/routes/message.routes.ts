import { Router } from "express";
import { validateAuth } from "../middlewares/auth.middleware.js";
import {
  conversations,
  deleteMessage,
} from "../controllers/message.controller.js";

const router = Router();

router.get("/:username", validateAuth, conversations);
router.delete("/:messageId", validateAuth, deleteMessage);

export default router;
