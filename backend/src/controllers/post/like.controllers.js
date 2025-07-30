import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Like from "../../models/post/Like.models.js";
import User from "../../models/user/user.models.js";
import Comment from "../../models/post/comment.models.js";
import Post from "../../models/post/post.models.js";
import mongoose from "mongoose";

const togglePostLike = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const user = await User.findOne({ clerkId: req.auth.userId });
  if (!user) {
    throw new ApiError(404, "Unauthorized");
  }
  const post = await Post.exists({ _id: postId });
  if (!post) {
    throw new ApiError(400, "Invalid PostId");
  }
  // if exist so delete otherwise create
  const like = await Like.findOneAndDelete({
    userId: user._id,
    postId,
  });
  if (like) {
    return res.status(200).json(new ApiResponse(200, "Like delted"));
  }
  await Like.create({
    userId: user._id,
    postId,
  });
  return res.status(200).json(new ApiResponse(200, "Like created"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const user = await User.findOne({ clerkId: req.auth.userId });
  if (!user) {
    throw new ApiError(404, "Unauthorized");
  }
  const comment = await Comment.exists({ _id: commentId });
  if (!comment) {
    throw new ApiError(400, "Invalid commentId");
  }
  // if exist so delete otherwise create
  const like = await Like.findOneAndDelete({
    userId: user._id,
    commentId,
  });
  if (like) {
    return res.status(200).json(new ApiResponse(200, "Like delted"));
  }
  await Like.create({
    userId: user._id,
    commentId,
  });
  return res.status(200).json(new ApiResponse(200, "Like created"));
});

const getLikeStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    clerkId: req.auth.userId,
  });

  if (!user) {
    throw new ApiError(401, "User not found in dbs");
  }

  const isLiked = await Like.findOne({
    userId: user._id,
    $or: [
      { postId: new mongoose.Types.ObjectId(id) },
      { commentId: new mongoose.Types.ObjectId(id) },
    ],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, !!isLiked, "return status of likes"));
});

export { togglePostLike, toggleCommentLike, getLikeStatus };
