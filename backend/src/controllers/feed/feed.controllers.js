import Post from "../../models/post/post.models.js";
import FollowRelationship from "../../models/user/followRelationship.js";
import User from '../../models/user/user.models.js';
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


const globalFeed = asyncHandler(async(req, res) => {
    const longitude = req.coordinates?.longitude;
    const latitude = req.coordinates?.latitude;

    const user = await User.findOne({clerkId: req.auth.userId});
    console.log(user);
    const following = await FollowRelationship.find({
        followedUserId: user._id
    }).select("userId")

    const followingUserId = following?.map(f => f.userId);

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
            $limit: 20
        }
    ])
    console.log("locationPosts ", locationPosts);

    const locationPostId = new Set(locationPosts.map(p => p?._id.toString()));

    const followedPost = await Post.find(
        {
            userId: {
                $in: followingUserId
            },
            _id: {
                $nin: locationPostId
            }
        }
    ).sort({createdAt: -1})
    .limit(20);

    const combinePost = [...locationPosts, ...followedPost];
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                posts: combinePost.slice(0, 20)
            },
            "Fetched posts"
        )
    )
})

export {
    globalFeed
}