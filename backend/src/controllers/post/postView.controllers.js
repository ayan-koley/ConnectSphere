import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import PostView from "../../models/post/postView.models.js";
import Post from "../../models/post/post.models.js";

const incrementPostView = asyncHandler(async(req, res) => {
    const { postId } = req.params;
    const isValidPostId = await Post.findById(postId);
    if(!isValidPostId) {
        throw new ApiError(
            400,
            "Invalid PostId"
        )
    }
    await PostView.findOneAndUpdate(
        {
            postId
        },
        {
            $inc: { totalView: 1}
        },
        {
            new: true
        }
    )
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "Increment views"
        )
    )
})

export {
    incrementPostView
}