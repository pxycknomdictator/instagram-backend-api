import { Router } from "express";
import { validateAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { commentSchema } from "../validators/comment.validator.js";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controllers/comment.controller.js";

const router = Router();

router
  .route("/")
  .post(validateAuth, validate(commentSchema), createComment)
  .get(getComments);

router.route("/:commentId").delete(validateAuth, deleteComment);

export default router;
