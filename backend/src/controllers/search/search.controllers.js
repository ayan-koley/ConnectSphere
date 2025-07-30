import Post from "../../models/post/post.models.js";
import UserProfile from "../../models/user/userProfile.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const searchPost = asyncHandler(async(req, res) => {
    const { input } = req.query;
    const longitude = req.coordinates?.longitude;
    const latitude = req.coordinates?.latitude;

    if(!input || input.trim() === '') {
        throw new ApiError(
            400,
            "input is required"
        )
    }

    const posts = await Post.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [parseFloat(longitude), parseFloat(latitude)]
                },
                distanceField: "distance",
                spherical: true, // calculate distance between post and you by og earth shape
                query: {
                    $or: [
                        {
                            description: {
                                $regex: input , $options: "i"
                            }
                        },
                        {
                            hashtag: {
                                $regex: input, $options: "i"
                            }
                        }
                    ]
                }
            }
            
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
                            _id: 0
                        }
                    }
                ]
            }
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
                            _id: 0
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "likes",
                foreignField: "postId",
                localField: "_id",
                as: "likeDocs",
                
            }
        },
        {
            $lookup: {
                from: "comments",
                foreignField: "postId",
                localField: "_id",
                as: "commentDocs",
                
            }
        },
        {
            $lookup: {
                from: "postviews",
                foreignField: "postId",
                localField: "_id",
                as: "totalViews"
            }
        },
        {
            $addFields: {
                totalComments: {
                    $size: "$commentDocs"
                },
                totalLikes: {
                    $size: "$likeDocs"
                },
                avatar: {
                    $first: "$avatar"
                },
                userDetails: {
                    $first: "$userDetails"
                },
                totalViews: {
                    $first: "$totalViews"
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $limit: 30
        }
    ])
    const users = await UserProfile.aggregate([
        {
            $match: {
                $or: [
                    {
                        username: {
                            $regex: input, $options: "i"
                        }
                    },
                    {
                        firstName: {
                            $regex: input, $options: "i"
                        }
                    }
                ]
            }
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
                            image: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                user: {
                    $first: "$user"
                }
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                posts,
                users
            },
            "Fetched all details of search query"
        )
    )
})

const searchUserbyUsername = asyncHandler(async(req, res) => {
    const { username } = req.query;
    
    const users = await UserProfile.aggregate([
        {
            $match: {
                username: { $regex: username, $options: "i"}
            }
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
                            _id: 0,
                            image: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                avatar: {
                    $first: "$avatar"
                }
            }
        },
        {
            $project: {
                _id: 1,
                userId: 1,
                username: 1,
                firstName: 1,
                lastName: 1
            }
        },
        {
            $limit: 10
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            users,
            "Successfully fetched users based on username"
        )
    )
})

export {
    searchPost,
    searchUserbyUsername
}