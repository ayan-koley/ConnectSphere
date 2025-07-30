import Post from "../../models/post/post.models.js";
import User from "../../models/user/user.models.js";
import Comment from "../../models/post/comment.models.js";
import Like from "../../models/post/Like.models.js";
import Favorite from "../../models/post/favorites.models.js";
import PostView from "../../models/post/postView.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { deleteFile, uploadFile } from "../../utils/imagekit.js";
import mongoose, { Schema } from "mongoose";

const createPost = asyncHandler(async (req, res) => {
  const { description, ...data } = req.body;
  if (!description || description.trim() === "") {
    throw new ApiError(400, "Invalid description");
  }

  const user = await User.findOne({ clerkId: req.auth.userId });
  if (!user) {
    throw new ApiError(404, "User is not found in dbs");
  }

  const newPost = await Post.create({
    userId: user._id,
    description: description,
    ...data,
    location: {
      type: "Point",
      coordinates: [req.coordinates?.longitude, req.coordinates?.latitude],
    },
  });
  if (!newPost) {
    throw new ApiError(500, "Unable to create post");
  }

  const files = (await uploadFile(req.files, newPost._id)).map((file) => {
    return {
      url: file.url,
      fileId: file.fileId,
    };
  });
  newPost.media = files;
  await newPost.save();

  await PostView.create({
    postId: newPost._id,
  });

  const post = await Post.aggregate([
    {
      $match: {
        _id: newPost._id,
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "userId",
        as: "avatar",
        pipeline: [
          {
            $project: {
              image: 1,
              _id: 0,
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
              username: 1,
              firstName: 1,
              lastName: 1,
              _id: 0,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "likes",
        foreignField: "postId",
        localField: "_id",
        as: "likeDocs",
      },
    },
    {
      $lookup: {
        from: "comments",
        foreignField: "postId",
        localField: "_id",
        as: "commentDocs",
      },
    },
    {
      $lookup: {
        from: "postviews",
        foreignField: "postId",
        localField: "_id",
        as: "totalViews",
      },
    },
    {
      $addFields: {
        totalComments: {
          $size: "$commentDocs",
        },
        totalLikes: {
          $size: "$likeDocs",
        },
        avatar: {
          $first: "$avatar",
        },
        userDetails: {
          $first: "$userDetails",
        },
        totalViews: {
          $first: "$totalViews",
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(201, post, "Post created successfully"));
});

// update only description at this time later working on image, video, and links
const updatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { description } = req.body;
  if (!description || description.trim() === "") {
    throw new ApiError(400, "Invalid Description");
  }
  const user = await User.findOne({ clerkId: req.auth.userId });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const updatedPost = await Post.findOneAndUpdate(
    {
      _id: postId,
      userId: user._id,
    },
    {
      description,
    },
    {
      new: true,
    }
  );
  if (!updatedPost) {
    throw new ApiError(400, "Unable to find post");
  }
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        post: updatedPost,
      },
      "Successfully Update Post"
    )
  );
});

// delete post is on working stage;
const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findByIdAndDelete(postId);
  if (!post) {
    throw new ApiError(400, "Invalid postId");
  }
  // delete all photos form imagekit
  post.media?.map(async (f) => {
    await deleteFile(f.fileId);
  });
  // delete comment
  await Comment.deleteMany({
    postId,
  });
  // delete likes
  await Like.deleteMany({
    postId,
  });
  // delete favorites
  await Favorite.deleteOne({
    postId,
  }),
    // delete postView
    await PostView.deleteOne({
      postId,
    });

  return res
    .status(200)
    .json(new ApiResponse(200, "Post and some dependencies are deleted"));
});

const getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await Post.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(postId),
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "userId",
        as: "avatar",
        pipeline: [
          {
            $project: {
              image: 1,
              _id: 0,
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
              username: 1,
              firstName: 1,
              lastName: 1,
              _id: 0,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "likes",
        foreignField: "postId",
        localField: "_id",
        as: "totalLikes",
      },
    },
    {
      $lookup: {
        from: "comments",
        foreignField: "postId",
        localField: "_id",
        as: "totalComments",
      },
    },
    {
      $lookup: {
        from: "postviews",
        foreignField: "postId",
        localField: "_id",
        as: "totalViews",
      },
    },
    {
      $addFields: {
        totalComments: {
          $size: "$totalComments",
        },
        totalLikes: {
          $size: "$totalLikes",
        },
        avatar: {
          $first: "$avatar",
        },
        userDetails: {
          $first: "$userDetails",
        },
        totalViews: {
          $first: "$totalViews",
        },
      },
    },
  ]);

  if (!post) {
    throw new ApiError(404, "Invalid Post Id ");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, post[0], "Post fetched successfully"));
});

const getUserAllPost = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(400, "Invalid Userid");
  }
  const posts = await Post.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(user._id),
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "userId",
        as: "avatar",
        pipeline: [
          {
            $project: {
              image: 1,
              _id: 0,
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
              username: 1,
              firstName: 1,
              lastName: 1,
              _id: 0,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "likes",
        foreignField: "postId",
        localField: "_id",
        as: "likeDocs",
      },
    },
    {
      $lookup: {
        from: "comments",
        foreignField: "postId",
        localField: "_id",
        as: "commentDocs",
      },
    },
    {
      $lookup: {
        from: "postviews",
        foreignField: "postId",
        localField: "_id",
        as: "totalViews",
      },
    },
    {
      $addFields: {
        totalComments: {
          $size: "$commentDocs",
        },
        totalLikes: {
          $size: "$likeDocs",
        },
        avatar: {
          $first: "$avatar",
        },
        userDetails: {
          $first: "$userDetails",
        },
        totalViews: {
          $first: "$totalViews",
        },
      },
    },
  ]);
  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Successfully fetched all posts"));
});

const getAllMentionPosts = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(400, "Invalid Userid");
  }
  const posts = await Post.aggregate([
    {
      $match: {
        $expr: {
          $in: [new mongoose.Types.ObjectId(userId), "$mention"],
        },
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "userId",
        as: "avatar",
        pipeline: [
          {
            $project: {
              image: 1,
              _id: 0,
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
              username: 1,
              firstName: 1,
              lastName: 1,
              _id: 0,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "likes",
        foreignField: "postId",
        localField: "_id",
        as: "likeDocs",
      },
    },
    {
      $lookup: {
        from: "comments",
        foreignField: "postId",
        localField: "_id",
        as: "commentDocs",
      },
    },
    {
      $lookup: {
        from: "postviews",
        foreignField: "postId",
        localField: "_id",
        as: "totalViews",
      },
    },
    {
      $addFields: {
        totalComments: {
          $size: "$commentDocs",
        },
        totalLikes: {
          $size: "$likeDocs",
        },
        avatar: {
          $first: "$avatar",
        },
        userDetails: {
          $first: "$userDetails",
        },
        totalViews: {
          $first: "$totalViews",
        },
      },
    },
  ]);
  return res
    .status(200)
    .json(
      new ApiResponse(200, posts, "Successfully fetched all mention posts")
    );
});

export {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getUserAllPost,
  getAllMentionPosts,
};
