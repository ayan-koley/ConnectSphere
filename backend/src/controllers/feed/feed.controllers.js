import { getAuth } from "@clerk/express";
import Post from "../../models/post/post.models.js";
import FollowRelationship from "../../models/user/followRelationship.models.js";
import User from '../../models/user/user.models.js';
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


const globalFeed = asyncHandler(async(req, res) => {
    const longitude = req.coordinates?.longitude;
    const latitude = req.coordinates?.latitude;
    

    const locationPosts = await Post.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                },
                distanceField: "distance",
                spherical: true,
                query: {}
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
            $limit: 20
        }
    ])

    // sign in part feed -> based on following and location
    
    if(req.auth.userId) {

        const user = await User.findOne({clerkId: req.auth.userId});
        const following = await FollowRelationship.find({
            followedUserId: user?._id
        }).select("userId")
        const followingUserId = following?.map(f => f.userId);

        // const locationPostId = new Set(locationPosts.map(p => p?._id.toString()));
        const locationPostId = locationPosts?.map((p) => p._id);


        const followedPost = await Post.aggregate(
            [
                {
                    $match: {
                        userId: {
                            $in: followingUserId
                        },
                        _id: {
                            $nin: locationPostId
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
                                    _id: 1
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
                                    lastName: 1
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
                        }
                    }
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $limit: 20
                }
            ]
        )


        const combinePost = [...locationPosts, ...followedPost];

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                combinePost,
                "Fetched posts"
            )
        )

    }
    // sign out part feed -> based on location
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            locationPosts,
            "Fetched successfully"
        )
    )
    
})

// suggest people
// following id ->  suggest my following person following
const getSuggestedUsers = asyncHandler(async(req, res) => {
    const user = await User.findOne({clerkId: req.auth.userId});
    if(!user) {
        throw new ApiError(
            404,
            "User is not found in dbs"
        )
    }

    const userFollowingUser = await FollowRelationship.find({
        followedUserId: user._id
    })

    if(userFollowingUser.length > 0) {
        const userFollowingUserId = userFollowingUser?.map((f) => f.userId);

        const suggestionUsers = await FollowRelationship.find(
            {
                followedUserId: { $in: userFollowingUserId }
            }
        ).limit(20);

        const filterOutSimilars = suggestionUsers?.filter((u) => !userFollowingUserId.some(id => id.equals(u?.userId)));

        // ✅ Extract user IDs
        const suggestedUserIds = filterOutSimilars.map(u => u.userId);


        const users = await User.aggregate([
        {
            $match: {
                _id: {$in: suggestedUserIds}
            }
        },
        {
            $lookup: {
                from: "userprofiles",
                foreignField: "userId",
                localField: "_id",
                as: "userDetails"
            }
        },
        {
            $addFields: {
                userDetails: {
                    $first: "$userDetails"
                }
            }
        },
        {
            $project: {
                image: 1,
                userDetails: 1
            }
        },
        {
            $limit: 20
        }
    ])

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                users,
                "Suggest friend successfully"
            )
        )
    } 
    const users = await User.aggregate([
        {
            $match: {
                _id: {$ne: user._id}
            }
        },
        {
            $lookup: {
                from: "userprofiles",
                foreignField: "userId",
                localField: "_id",
                as: "userDetails"
            }
        },
        {
            $addFields: {
                userDetails: {
                    $first: "$userDetails"
                }
            }
        },
        {
            $project: {
                image: 1,
                userDetails: 1
            }
        },
        {
            $limit: 20
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            users,
            "Suggest friend successfully"
        )
    )
})

export {
    globalFeed,
    getSuggestedUsers
}