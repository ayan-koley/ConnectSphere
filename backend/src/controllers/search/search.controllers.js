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
            $sort: {
                createdAt: -1
            }
        },
        {
            $limit: 20
        }
    ])
    const users = await UserProfile.find({
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
    })

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

export {
    searchPost
}