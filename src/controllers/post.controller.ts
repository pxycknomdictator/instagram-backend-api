import { ApiRes } from "../utils/response.js";
import { Post } from "../models/post.model.js";
import { asyncGuard } from "../utils/asyncGuard.js";

const getPosts = asyncGuard(async (_, res) => {
  const posts = await Post.find();
  return res.status(200).json(new ApiRes(200, "Posts", posts));
});

const createPost = asyncGuard(async (_, res) => {
  return res.status(201).json(new ApiRes(201, "Post created"));
});

export { getPosts, createPost };
