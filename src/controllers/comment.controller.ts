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
  const postId = req.query.postId as string;

  if (!isValidObjectId(postId)) {
    return res.status(400).json(new ApiRes(400, "Invalid post ID"));
  }

  const post = await Post.findById(postId).populate("comments");

  if (!post) {
    return res.status(404).json(new ApiRes(404, "Post not found"));
  }

  return res.status(200).json(new ApiRes(200, "Comments", post.comments));
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

  const post = await Post.findByIdAndUpdate(
    postId,
    { $pull: { comments: commentId } },
    { new: true },
  );

  await Comment.findByIdAndDelete(commentId);

  return res.status(200).json(new ApiRes(200, "comment deleted"));
});

const updateComment = asyncGuard(async (req, res) => {
  const commentId = req.params.commentId;
  const { comment }: CommentSchema = req.body;

  if (!isValidObjectId(commentId)) {
    return res.status(400).json(new ApiRes(400, "invalid comment id"));
  }

  const updated = await Comment.findByIdAndUpdate(commentId, { comment });

  if (!updated) {
    return res.status(404).json(new ApiRes(404, "Comment not found"));
  }

  return res.status(200).json(new ApiRes(200, "Comment updated"));
});

export { createComment, getComments, deleteComment, updateComment };
