import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js";
import User from "../../models/user/user.models.js";
import mongoose from "mongoose";


const dashboardController = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const data = await User.aggregate([
        {
            $match: { 
                _id: new mongoose.Types.ObjectId(userId) 
            } 
        },
        {
            $lookup: {
                from: "userprofiles",
                localField: "_id",
                foreignField: "userId",
                as: "userDetails"
            }
        },
        {
            $lookup: {
                from: "posts",
                localField: "_id",
                foreignField: "userId",
                as: "posts"
            }
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "userId",
                as: "comments"
            }
        },
        {
            $lookup: {
                from: "followrelationships",
                localField: "_id",
                foreignField: "userId",
                as: "followers"
            }
        },
        {
            $lookup: {
                from: "followrelationships",
                localField: "_id",
                foreignField: "followedUserId",
                as: "following"
            }
        },
        {
            $project: {
                _id: 1,
                image: 1,
                postsCount: { $size: "$posts" },
                commentsCount: { $size: "$comments" },
                followersCount: { $size: "$followers" },
                followingCount: { $size: "$following" },
                userDetails: { $first: "$userDetails"}
            }
        }
    ])

    if(!data || data.length === 0) {
        throw new ApiError(404, "User not found");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, data, "User dashboard data retrieved successfully")
    );    
});

export { dashboardController };