import Post from "../../models/post/post.models.js";
import User from "../../models/user/user.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const createPost = asyncHandler(async(req, res) => {
    const { description, ...data } = req.body;
    if(!description  || description.trim() === '') {
        throw new ApiError(
            400,
            "Invalid description"
        )
    }

    const user = await User.findOne({clerkId: req.auth.userId});
    if(!user) {
        throw new ApiError(
            404,
            "User is not found in dbs"
        )
    }

    const newPost = await Post.create(
        {
            userId: user._id,
            description: description,
            ...data
        }
    )
    if(!newPost) {
        throw new ApiError(
            500,
            "Unable to create post"
        )
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            201,
            {
                post: newPost
            },
            "Post created successfully"
        )
    )
})

// update only description at this time later working on image, video, and links
const updatePost = asyncHandler(async(req, res) => {
    const { postId } = req.params;
    const { description } = req.body;
    if(!description || description.trim() === '') {
        throw new ApiError(
            400,
            "Invalid Description"
        )
    }
    const user = await User.findOne({clerkId: req.auth.userId});
    if(!user) {
        throw new ApiError(
            404,
            "User not found"
        )
    }
    const updatedPost = await Post.findOneAndUpdate(
        {
            _id: postId,
            userId: user._id
        },
        {
            description
        },
        {
            new: true
        }
    ) 
    if(!updatedPost) {
        throw new ApiError(
            400,
            "Unable to find post"
        )
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                post: updatedPost
            },
            "Successfully Update Post"
        )
    )
})

// TODO: get all post that work on later

// delete post is on working stage;


export {
    createPost,
    updatePost
}