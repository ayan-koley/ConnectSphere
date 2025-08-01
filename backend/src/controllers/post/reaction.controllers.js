import { asyncHandler } from "../../utils/asyncHandler.js";
import Like from '../../models/post/Like.models.js'
import Favorite from "../../models/post/favorites.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import User from "../../models/user/user.models.js";

const getUserPostReactions = asyncHandler(async(req, res) => {
    const user = await User.findOne({
        clerkId: req.auth.userId
    });
    if(!user) {
        throw new ApiError(
            404,
            "User is not found in dbs"
        )
    }
     const [likes, favorites] = await Promise.all([
        Like.find({ userId: user._id }).select("postId -_id"),
        Favorite.find({ userId: user._id }).select("postId -_id"),
    ]);
    let likedPostIds = [];
    for(let docs of likes) {
        if(docs.postId !== undefined) {
            likedPostIds.push(docs.postId.toString());
        }
    }
    const favoritedPostIds = favorites.map((fav) => fav.postId.toString());
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                likedPostIds: likedPostIds,
                favoritedPostIds: favoritedPostIds
            },
            "Reaction fetched from dbs"
        )
    )
})

export {
    getUserPostReactions
}