import mongoose from 'mongoose';
import User from '../../models/user/user.models.js';
import UserProfile from "../../models/user/userProfile.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const updatefirstName = asyncHandler(async(req, res) => {
    const { firstName } = req.body;
    if(!firstName || firstName.trim() === '') {
        throw new ApiError(
            400,
            "fullName is required"
        )
    }
     const user = await User.findOne({
        clerkId: req.auth.userId
    });
    if(!user) {
        throw new ApiError(
            400,
            "User is not available on dbs"
        )
    }
    
    const updated_profile = await UserProfile.findOneAndUpdate(
        {userId: user._id },
        {
            $set: {
                firstName
            }
        },
        {
            new: true
        }
    )

    if(!updated_profile) {
        throw new ApiError(
            500,
            "Internal server error on update fullname"
        )
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                profile: updated_profile
            },
            "Firstname Update Successfully"
        )
    )
})

const updatelastName = asyncHandler(async(req, res) => {
    const { lastName } = req.body;
    if(!lastName || lastName.trim() === '') {
        throw new ApiError(
            400,
            "LastName is required"
        )
    }
     const user = await User.findOne({
        clerkId: req.auth.userId
    });
    if(!user) {
        throw new ApiError(
            400,
            "User is not available on dbs"
        )
    }
    
    const updated_profile = await UserProfile.findOneAndUpdate(
        {userId: user._id },
        {
            $set: {
                lastName
            }
        },
        {
            new: true
        }
    )

    if(!updated_profile) {
        throw new ApiError(
            500,
            "Internal server error on update fullname"
        )
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                profile: updated_profile
            },
            "Lastname update successfully"
        )
    )
    
})

const updateBio = asyncHandler(async(req, res) => {
    const { bio } = req.body;
    if(!bio || bio.trim() === '') {
        throw new ApiError(
            400,
            "bio is required"
        )
    }
    const user = await User.findOne({
        clerkId: req.auth.userId
    });
    if(!user) {
        throw new ApiError(
            400,
            "User is not available on dbs"
        )
    }
    
    const updated_profile = await UserProfile.findOneAndUpdate(
        {userId: user._id },
        {
            bio
        },
        {
            new: true
        }
    )

    if(!updated_profile) {
        throw new ApiError(
            500,
            "Internal server error on update bio"
        )
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
        {
            profile: updated_profile
        },
        "Bio update successfully"
        )
    )
})

const updateDescription = asyncHandler(async(req, res) => {
    const { description } = req.body;
    if(!description || description.trim() === '') {
        throw new ApiError(
            400,
            "Description is required"
        )
    }
    const user = await User.findOne({
        clerkId: req.auth.userId
    });
    if(!user) {
        throw new ApiError(
            400,
            "User is not available on dbs"
        )
    }
    
    const updated_profile = await UserProfile.findOneAndUpdate(
        { userId: user._id },
        {
            description
        },
        {
            new: true
        }
    )

    if(!updated_profile) {
        throw new ApiError(
            500,
            "Internal server error on update Description"
        )
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
        {
            profile: updated_profile
        },
        "Description update successfully"
        )
    )
})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findOne({ clerkId: req.auth.userId });
    if (!user) {  
        throw new ApiError(404, "User not found");
    }
    const profile = await User.aggregate([
        {
            $match: {
                _id: user._id,
                
            },
        },
        {
            $lookup: {
                from: "userprofiles",
                foreignField: "userId",
                localField: "_id",
                as: "profileDetails",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            lastName: 1,
                            firstName: 1,
                            bio: 1,
                            description: 1,
                        }
                    }
                ]
            }
        },
        {
            $project: {
                email: 1,
                image: 1,
                _id: 1,
                profileDetails: 1
            }
        }
    ]);
    if (!profile) {
        throw new ApiError(404, "User profile not found");
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            profile[0],
            "User profile fetched successfully"
        )
    );
})


export {
    updatefirstName,
    updatelastName,
    updateBio,
    updateDescription,
    getUserProfile
}