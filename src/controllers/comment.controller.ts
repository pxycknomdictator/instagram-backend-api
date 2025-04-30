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

const getComments = asyncGuard(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit as string) || 10);
  const skip = parseInt(req.query.skip as string) || 0;

  const comments = await Comment.find().skip(skip).limit(limit);
  return res.status(200).json(new ApiRes(200, "Comments", comments));
});

const deleteComment = asyncGuard(async (req, res) => {
  const commentId = req.params.commentId;
  const postId = req.query.postId;

  if (!postId) {
    return res.status(400).json(new ApiRes(400, "post id is required"));
  }

  if (!isValidObjectId(commentId)) {
    return res.status(400).json(new ApiRes(400, "invalid comment id"));
  }

  await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
  await Comment.findByIdAndDelete(commentId);

  return res.status(200).json(new ApiRes(200, "comment deleted"));
});

export { createComment, getComments, deleteComment };
