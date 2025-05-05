import { Router } from "express";
import { validateAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { passwordsSchema } from "../validators/user.validator.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  changePassword,
  currentUser,
  destroyAvatar,
  followUser,
  getFollowers,
  getFollowing,
  getUser,
  unfollowUser,
  updateAvatar,
} from "../controllers/user.controller.js";

const router = Router();

router.use(validateAuth);

router.get("/profile/:username", getUser);
router.get("/:username/followers", getFollowers);
router.get("/:username/following", getFollowing);
router.get("/profile/current-user", currentUser);
router.post("/:userId/follow", followUser);
router.delete("/:userId/unfollow", unfollowUser);

router
  .route("/profile/avatar")
  .delete(destroyAvatar)
  .patch(upload.single("avatar"), updateAvatar);

router
  .route("/profile/change-password")
  .put(validate(passwordsSchema), changePassword);

export default router;
