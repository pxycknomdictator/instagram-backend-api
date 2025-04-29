import { POSTS } from "../constant.js";
import { ApiRes } from "../utils/response.js";
import { Post } from "../models/post.model.js";
import { asyncGuard } from "../utils/asyncGuard.js";
import { uploadFileOneCloud } from "../helpers/cloudinary.helper.js";
import { isValidObjectId } from "mongoose";

const getPosts = asyncGuard(async (_, res) => {
  const posts = await Post.find();
  return res.status(200).json(new ApiRes(200, "Posts", posts));
});

const createPost = asyncGuard(async (req, res) => {
  const createdBy = req.user?._id;
  const filePath = req.file?.path;

  let payload = req.body ? { ...req.body, createdBy } : { createdBy };

  if (!filePath) {
    return res.status(400).json(new ApiRes(400, "File is required"));
  }

  const link = await uploadFileOneCloud(filePath, POSTS);

  if (!link) {
    return res.status(500).json(new ApiRes(500, "Failed to upload file"));
  }

  payload.postUrl = link;

  const post = await Post.create(payload);

  if (!post) {
    return res.status(400).json(new ApiRes(400, "Failed to create post"));
  }

  return res.status(201).json(new ApiRes(201, "Post created", post));
});

const deletePost = asyncGuard(async (req, res) => {
  const _id = req.params.postId;

  if (!isValidObjectId(_id)) {
    return res.status(400).json(new ApiRes(400, "Valid post id is required"));
  }

  await Post.findByIdAndDelete(_id);
  return res.status(200).json(new ApiRes(200, "Post deleted"));
});

export { getPosts, createPost, deletePost };
