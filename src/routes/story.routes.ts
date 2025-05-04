import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { storySchema } from "../validators/story.validator.js";
import { validateAuth } from "../middlewares/auth.middleware.js";
import { uploadStory } from "../controllers/story.controller.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.use(validateAuth);

router
  .route("/")
  .post(validate(storySchema), upload.single("story"), uploadStory);

export default router;
