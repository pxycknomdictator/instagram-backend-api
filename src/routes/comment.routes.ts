import { Router } from "express";
import { validateAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { commentSchema } from "../validators/comment.validator.js";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/comment.controller.js";

const router = Router();

router
  .route("/")
  .get(getComments)
  .post(validateAuth, validate(commentSchema), createComment);

router
  .route("/:commentId")
  .delete(validateAuth, deleteComment)
  .patch(validateAuth, validate(commentSchema), updateComment);

export default router;
