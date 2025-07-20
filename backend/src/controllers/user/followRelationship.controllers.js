import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import FollowRelationship from "../../models/user/followRelationship.js";

const followUser = asyncHandler(async (req, res) => {
    const { followedUserId } = req.body;
    const userId = req.auth.userId;

    if (!followedUserId) {
        throw new ApiError(400, "Followed user ID is required");
    }

    // Check if the follow relationship already exists
    const existingFollow = await FollowRelationship.findOne({
        userId,
        followedUserId
    });

    if (existingFollow) {
        throw new ApiError(400, "You are already following this user");
    }

    // Create a new follow relationship
    const newFollow = await FollowRelationship.create({
        userId,
        followedUserId
    });

    return res.status(201).json(new ApiResponse(201, "User followed successfully"));
});

const unfollowUser = asyncHandler(async (req, res) => {
    const { followedUserId } = req.body;
    const userId = req.auth.userId;

    if (!followedUserId) {
        throw new ApiError(400, "Followed user ID is required");
    }

    // Find the follow relationship to delete
    const followRelationship = await FollowRelationship.findOneAndDelete({
        userId,
        followedUserId
    });

    if (!followRelationship) {
        throw new ApiError(404, "Follow relationship not found");
    }

    return res.status(200).json(new ApiResponse(200, "User unfollowed successfully"));
});

const getFollowers = asyncHandler(async (req, res) => {
    const userId = req.auth.userId;

    // Find all users that follow the authenticated user
    const followers = await FollowRelationship.find({ followedUserId: userId })
        .populate('userId', 'username image');

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {followers},
            "Followers retrieved successfully"
        )
    );
});

const getFollowing = asyncHandler(async (req, res) => {
    const userId = req.auth.userId;

    // Find all users that the authenticated user is following
    const following = await FollowRelationship.find({ userId })
        .populate('followedUserId', 'username image');

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {following},
            "Following users retrieved successfully"
        )
    );
});

export {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing
};