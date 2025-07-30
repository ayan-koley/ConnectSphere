import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Comment from "../../models/post/comment.models.js";
import User from "../../models/user/user.models.js";
import Like from "../../models/post/Like.models.js";
import mongoose from "mongoose";

const createComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  if (!content) {
    throw new ApiError(400, "Comment is required");
  }
  const user = await User.findOne({ clerkId: req.auth.userId });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  console.log("Content is ", content);
  const comment = await Comment.create({
    postId,
    userId: user._id,
    content,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment created successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content) {
    throw new ApiError(400, "Content is required");
  }
  const user = await User.findOne({ clerkId: req.auth.userId });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const comment = await Comment.findById(req.params?.commentId);
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }
  if (comment.userId.toString() !== user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this comment");
  }
  comment.content = content;
  await comment.save();
  return res
    .status(200)
    .json(new ApiResponse(200, { comment }, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const user = await User.findOne({ clerkId: req.auth.userId });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const comment = await Comment.findOneAndDelete({
    _id: req.params.commentId,
    userId: user._id,
  });

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }
  // delete likes on this comments
  await Like.deleteMany({
    commentId: comment._id,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Comment deleted successfully"));
});

const getCommentsByPostId = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!postId) {
    throw new ApiError(400, "Post ID is required");
  }
  const comments = await Comment.aggregate([
    {
      $match: {
        postId: new mongoose.Types.ObjectId(postId),
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "userId",
        as: "user",
        pipeline: [
          {
            $project: {
              image: 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "userprofiles",
        foreignField: "userId",
        localField: "userId",
        as: "userDetails",
        pipeline: [
          {
            $project: {
              firstName: 1,
              lastName: 1,
              username: 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "likes",
        foreignField: "commentId",
        localField: "_id",
        as: "totalLikes",
      },
    },
    {
      $addFields: {
        user: {
          $first: "$user",
        },
        userDetails: {
          $first: "$userDetails",
        },
        totalLikes: {
          $size: "$totalLikes",
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments retrieved successfully"));
});

export { createComment, updateComment, deleteComment, getCommentsByPostId };
