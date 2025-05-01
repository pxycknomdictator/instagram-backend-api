import { isValidObjectId } from "mongoose";
import { asyncGuard } from "../utils/asyncGuard.js";
import { ApiRes } from "../utils/response.js";
import { LikeSchema } from "../validators/like.validator.js";
import { Post } from "../models/post.model.js";

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

export { createLike };
