import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { postSchema } from "../validators/post.validator.js";
import { validateAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createPost, getPosts } from "../controllers/post.controller.js";

const router = Router();

router
  .route("/")
  .get(getPosts)
  .post(validateAuth, validate(postSchema), upload.single("post"), createPost);

export default router;
