import { Router } from "express";
import { validateAuth } from "../middlewares/auth.middleware.js";
import {
  changePassword,
  currentUser,
  destroyAvatar,
  getFollowers,
  getFollowing,
  getUser,
  updateAvatar,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { passwordsSchema } from "../validators/user.validator.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/profile/:username", getUser);
router.get("/:username/followers", validateAuth, getFollowers);
router.get("/:username/following", validateAuth, getFollowing);
router.get("/profile/current-user", validateAuth, currentUser);

router
  .route("/profile/avatar")
  .delete(validateAuth, destroyAvatar)
  .patch(validateAuth, upload.single("avatar"), updateAvatar);

router
  .route("/profile/change-password")
  .put(validateAuth, validate(passwordsSchema), changePassword);

export default router;
