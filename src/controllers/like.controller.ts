import { isValidObjectId } from "mongoose";
import { ApiRes } from "../utils/response.js";
import { Post } from "../models/post.model.js";
import { asyncGuard } from "../utils/asyncGuard.js";
import { LikeSchema } from "../validators/like.validator.js";

const createLike = asyncGuard(async (req, res) => {
  const _id = req.user?._id;
  const { postId } = req.body as LikeSchema;

  if (!isValidObjectId(_id) || !isValidObjectId(postId)) {
    return res.status(400).json(new ApiRes(400, "Valid ID required"));
  }

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json(new ApiRes(404, "Post not found"));

  const result = await Post.updateOne(
    { $and: [{ _id: postId }, { likes: { $ne: _id } }] },
    { $addToSet: { likes: _id } },
  );

  if (result.modifiedCount === 0) {
    return res.status(200).json(new ApiRes(200, "Already liked"));
  }

  return res.status(201).json(new ApiRes(201, "Like added"));
});

const removeLike = asyncGuard(async (req, res) => {
  const _id = req.user?._id;
  const postId = req.params.postId;

  if (!isValidObjectId(_id) || !isValidObjectId(postId)) {
    return res.status(400).json(new ApiRes(400, "Valid ID required"));
  }

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json(new ApiRes(404, "Post not found"));

  await Post.updateOne(
    { $and: [{ _id: postId }, { likes: { $eq: _id } }] },
    { $pull: { likes: _id } },
  );

  return res.status(200).json(new ApiRes(200, "Like removed successfully"));
});

export { createLike, removeLike };
