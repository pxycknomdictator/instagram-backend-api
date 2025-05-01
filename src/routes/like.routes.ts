import { Router } from "express";
import { likeSchema } from "../validators/like.validator.js";
import { validateAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createLike, removeLike } from "../controllers/like.controller.js";

const router = Router();

router.post("/", validateAuth, validate(likeSchema), createLike);
router.delete("/:postId", validateAuth, removeLike);

export default router;
