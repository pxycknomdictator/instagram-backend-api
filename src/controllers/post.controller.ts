import { configs } from "../constant.js";
import { ApiRes } from "../utils/response.js";
import { Post } from "../models/post.model.js";
import { asyncGuard } from "../utils/asyncGuard.js";

const getPosts = asyncGuard(async (_, res) => {
  const posts = await Post.find();
  return res.status(200).json(new ApiRes(200, "Posts", posts));
});

const createPost = asyncGuard(async (req, res) => {
  const createdBy = req.user?._id;
  const file = req.file?.filename;
  const postUrl = `${configs.SERVER_ORIGIN}:${configs.PORT}/${file}`;

  let payload = req.body ? { ...req.body, createdBy } : { createdBy };
  if (file) payload.postUrl = postUrl;

  const post = await Post.create(payload);

  if (!post) {
    return res.status(400).json(new ApiRes(400, "Failed to create post"));
  }

  return res.status(201).json(new ApiRes(201, "Post created", post));
});

export { getPosts, createPost };
