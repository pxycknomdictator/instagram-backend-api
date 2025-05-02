import { Router } from "express";
import { likeSchema } from "../validators/like.validator.js";
import { validateAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createLike, removeLike } from "../controllers/like.controller.js";

const router = Router();

router.use(validateAuth);

router.post("/", validate(likeSchema), createLike);
router.delete("/:postId", removeLike);

export default router;
