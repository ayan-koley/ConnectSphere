import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import FollowRelationship from "../../models/user/followRelationship.models.js";
import mongoose from "mongoose";
import User from "../../models/user/user.models.js";

const followUser = asyncHandler(async (req, res) => {
    const { followedUserId } = req.params;
    const user = await User.findOne({
        clerkId: req.auth.userId
    })
    if(!user) {
        throw new ApiError(
            400,
            "User is not found in dbs"
        )
    }

    if (!followedUserId) {
        throw new ApiError(400, "Followed user ID is required");
    }

    const isFollowedUserId = await User.findById(followedUserId);
    if(!isFollowedUserId) {
        throw new ApiError(
            400,
            "Invalid followedUserId"
        )
    }

    // Check if the follow relationship already exists
    const existingFollow = await FollowRelationship.findOne({
        userId: isFollowedUserId._id,
        followedUserId: user._id
    });

    if (existingFollow) {
        throw new ApiError(400, "You are already following this user");
    }

    // Create a new follow relationship
    await FollowRelationship.create({
        userId: isFollowedUserId._id,
        followedUserId: user._id
    });

    return res.status(201).json(new ApiResponse(201, "User followed successfully"));
});

const unfollowUser = asyncHandler(async (req, res) => {
    const { followedUserId } = req.params;
    const user = await User.findOne({
        clerkId: req.auth.userId
    })
    if(!user) {
        throw new ApiError(
            400,
            "User is not found in dbs"
        )
    }

    if (!followedUserId) {
        throw new ApiError(400, "Followed user ID is required");
    }

    // Find the follow relationship to delete
    const followRelationship = await FollowRelationship.findOneAndDelete({
        userId: new mongoose.Types.ObjectId(followedUserId),
        followedUserId: user._id
    });

    if (!followRelationship) {
        throw new ApiError(404, "Follow relationship not found");
    }

    return res.status(200).json(new ApiResponse(200, "User unfollowed successfully"));
});

const getFollowers = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Find all users that follow the authenticated user
    const followers = await FollowRelationship.find({ userId })
        .populate('followedUserId', 'username image');

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
    const { userId } = req.params;

    // Find all users that the authenticated user is following
    const following = await FollowRelationship.find({ followedUserId: userId })
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

const getFollowingStatus = asyncHandler(async(req, res) => {
    const { userId } = req.params;
    const user = await User.findOne({
        clerkId: req.auth.userId
    })
    if(!user) {
        throw new ApiError(
            400,
            "User is not found in dbs"
        )
    }
    const isFollowing = await FollowRelationship.findOne({
        userId: new mongoose.Types.ObjectId(userId),
        followedUserId: user._id
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            !!isFollowing,
            "Successfully Follow the user"
        )
    )
})

export {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    getFollowingStatus
};