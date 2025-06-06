import { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { POSTS } from "../constant.js";
import { ApiRes } from "../utils/response.js";
import { Post } from "../models/post.model.js";
import { asyncGuard } from "../utils/asyncGuard.js";
import {
  deleteFileFromCloud,
  uploadFileOneCloud,
} from "../helpers/cloudinary.helper.js";

const getPosts = asyncGuard(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit as string) || 10);
  const skip = parseInt(req.query.skip as string) || 0;

  const posts = await Post.find().skip(skip).limit(limit);

  return res.status(200).json(new ApiRes(200, "Posts", posts));
});

const createPost = asyncGuard(async (req, res) => {
  const createdBy = req.user?._id;
  const filePath = req.file?.path;

  let payload = req.body ? { ...req.body, createdBy } : { createdBy };

  if (!filePath) {
    return res.status(400).json(new ApiRes(400, "File is required"));
  }

  const {
    imagePublicId: postPublicId,
    link,
    fileType,
  } = await uploadFileOneCloud(filePath, POSTS);

  if (!link && !postPublicId && !fileType) {
    return res.status(500).json(new ApiRes(500, "Failed to upload file"));
  }

  payload.postUrl = link;
  payload.postPublicId = postPublicId;
  payload.postType = fileType;

  const post = await Post.create(payload);
  await User.findByIdAndUpdate(
    createdBy,
    { $push: { posts: post._id } },
    { new: true },
  );

  if (!post) {
    return res.status(400).json(new ApiRes(400, "Failed to create post"));
  }

  return res.status(201).json(new ApiRes(201, "Post created"));
});

const deletePost = asyncGuard(async (req, res) => {
  const _id = req.params.postId;
  const userId = req.user?._id;

  if (!isValidObjectId(_id)) {
    return res.status(400).json(new ApiRes(400, "Valid post id is required"));
  }

  const post = await Post.findById(_id);

  if (!post) {
    return res.status(400).json(new ApiRes(400, "Post not found"));
  }

  if (post.postPublicId && post.postType) {
    await deleteFileFromCloud(post.postPublicId, post.postType);
  }

  await User.findByIdAndUpdate(userId, { $pull: { posts: _id } });
  await Post.findByIdAndDelete(_id);

  return res.status(200).json(new ApiRes(200, "Post deleted"));
});

const getPost = asyncGuard(async (req, res) => {
  const _id = req.params.postId;

  if (!isValidObjectId(_id)) {
    return res.status(400).json(new ApiRes(400, "Valid post id is required"));
  }

  const post = await Post.findById(_id).populate("likes").populate("comments");
  if (!post) return res.status(404).json(new ApiRes(404, "Post not found"));

  const likes = post.likes.length;
  const comments = post.comments || [];

  return res
    .status(200)
    .json(new ApiRes(200, "Post", { post, likes, comments }));
});

export { getPosts, createPost, deletePost, getPost };
