import { Router } from "express";
import { likeSchema } from "../validators/like.validator.js";
import { validateAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createLike } from "../controllers/like.controller.js";

const router = Router();

router.post("/", validateAuth, validate(likeSchema), createLike);

export default router;
