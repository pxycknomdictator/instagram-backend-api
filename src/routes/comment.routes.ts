import { Router } from "express";
import { validateAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { commentSchema } from "../validators/comment.validator.js";
import { createComment } from "../controllers/comment.controller.js";

const router = Router();

router.route("/").post(validateAuth, validate(commentSchema), createComment);

export default router;
