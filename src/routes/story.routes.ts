import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { storySchema } from "../validators/story.validator.js";
import { validateAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  deleteStory,
  getStory,
  uploadStory,
} from "../controllers/story.controller.js";

const router = Router();

router.use(validateAuth);

router
  .route("/")
  .post(validate(storySchema), upload.single("story"), uploadStory);

router.route("/:storyId").delete(deleteStory).get(getStory);

export default router;
