import { Router } from "express";
import { postSchema } from "../validators/post.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createPost, getPosts } from "../controllers/post.controller.js";
import { validateAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/")
  .get(getPosts)
  .post(validateAuth, validate(postSchema), createPost);

export default router;
