import { isValidObjectId } from "mongoose";
import { ApiRes } from "../utils/response.js";
import { Post } from "../models/post.model.js";
import { asyncGuard } from "../utils/asyncGuard.js";
import { Comment } from "../models/comment.model.js";
import { CommentSchema } from "../validators/comment.validator.js";

const createComment = asyncGuard(async (req, res) => {
  const _id = req.user?._id;
  const postId = req.query.postId as string;
  const { comment }: CommentSchema = req.body;

  if (!isValidObjectId(postId)) {
    return res.status(400).json(new ApiRes(400, "invalid post id is required"));
  }

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json(new ApiRes(404, "Post not found"));

  const newComment = await Comment.create({ comment, postId, createdBy: _id });
  await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });

  return res.status(201).json(new ApiRes(201, "Comment created"));
});

export { createComment };
