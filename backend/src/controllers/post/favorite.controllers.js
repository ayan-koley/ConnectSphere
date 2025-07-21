import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Favorite from "../../models/post/favorites.models.js";
import User from "../../models/user/user.models.js";


const toggleFavoritePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    if (!postId) {
        throw new ApiError(400, "Post ID is required");
    }
    const user = await User.findOne({ clerkId: req.auth.userId });
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    let favorite = await Favorite.findOne({ userId: user._id, postId });
    if (favorite) {
        await Favorite.deleteOne({ _id: favorite._id });
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Post unfavorited successfully"
                )
            );
    }
    await Favorite.create({ userId: user._id, postId });
    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                "Post favorited successfully"
            )
        );
})

const getUserFavorites = asyncHandler(async (req, res) => {
    const user = await User.findOne({ clerkId: req.auth.userId });
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const favorites = await Favorite.find({ userId: user._id }).populate("postId");
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                favorites,
                "User favorites retrieved successfully"
            )
        );
})

export {
    toggleFavoritePost,
    getUserFavorites
}