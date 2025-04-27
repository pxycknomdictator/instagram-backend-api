import { Router } from "express";
import { getPosts } from "../controllers/post.controller.js";

const router = Router();

router.route("/").get(getPosts);

export default router;
