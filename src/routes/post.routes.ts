import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { postSchema } from "../validators/post.validator.js";
import { validateAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createPost,
  deletePost,
  getPosts,
} from "../controllers/post.controller.js";

const router = Router();

router
  .route("/")
  .get(getPosts)
  .post(validateAuth, validate(postSchema), upload.single("post"), createPost);

router.route("/:postId").delete(validateAuth, deletePost);

export default router;
