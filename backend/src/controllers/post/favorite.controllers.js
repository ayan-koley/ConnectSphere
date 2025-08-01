import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Favorite from "../../models/post/favorites.models.js";
import User from "../../models/user/user.models.js";
import mongoose from "mongoose";

const toggleFavoritePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!postId) {
    throw new ApiError(400, "Post ID is required");
  }
  const user = await User.findOne({ clerkId: req.auth.userId });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  let favorite = await Favorite.findOne({
    userId: user._id,
    postId: new mongoose.Types.ObjectId(postId),
  });
  if (favorite) {
    await Favorite.deleteOne({ _id: favorite._id });
    return res
      .status(200)
      .json(new ApiResponse(200, "Post unfavorited successfully"));
  }
  await Favorite.create({
    userId: user._id,
    postId: new mongoose.Types.ObjectId(postId),
  });
  return res
    .status(201)
    .json(new ApiResponse(201, "Post favorited successfully"));
});

const getUserFavorites = asyncHandler(async (req, res) => {
  const user = await User.findOne({ clerkId: req.auth.userId });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const favorites = await Favorite.aggregate([
    {
      $match: {
        userId: user._id,
      },
    },
    {
      $lookup: {
            from: "posts",
            foreignField: "_id",
            localField: "postId",
            as: "post",
            pipeline: [
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
                      foreignField: "postId",
                      localField: "_id",
                      as: "totalLikes"
                    }
                },
                {
                    $addFields: {
                        avatar: {
                        $first: "$avatar",
                        },
                        userDetails: {
                        $first: "$userDetails",
                        },
                        totalLikes: {
                          "$size": "$totalLikes"
                        }
                    },
                },
            ]
        },
    },
    {
        $addFields: {
            post: {
                $first: "$post"
            }
        }
    },
    {
        $sort: {
            createdAt: -1,
        },
    },
]);


    return res
    .status(200)
    .json(
        new ApiResponse(200, favorites, "User favorites retrieved successfully")
    );
});

const getPostFavoriteStatus = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const user = await User.findOne({ clerkId: req.auth.userId });
  if (!user) {
    throw new ApiError(401, "Unauthorized User");
  }

  const isFavorite = await Favorite.findOne({
    userId: user._id,
    postId: new mongoose.Types.ObjectId(postId),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, !!isFavorite, "Fetched post is favorite or not")
    );
});

export { toggleFavoritePost, getUserFavorites, getPostFavoriteStatus };
