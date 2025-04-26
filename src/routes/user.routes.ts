import { Router } from "express";
import { getUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/profile/:username", getUser);

export default router;
