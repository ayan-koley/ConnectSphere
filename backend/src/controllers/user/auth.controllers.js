import mongoose from "mongoose";
import { generateUsername } from "../../lib/generateUsername.js";
import User from "../../models/user/user.models.js";
import UserProfile from "../../models/user/userProfile.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Webhook } from 'svix'
import UserSetting from "../../models/user/userSetting.models.js";
import Post from "../../models/post/post.models.js";
import Like from "../../models/post/Like.models.js";
import Favorite from "../../models/post/favorites.models.js";
import FollowRelationship from "../../models/user/followRelationship.models.js";
import PostView from '../../models/post/postView.models.js';

const authenticateWithClerk = asyncHandler(async(req, res) => {
  // generate payload and svix header for webhook connections
  const payload = JSON.stringify(req.body);
  const svixHeaders = {
    'svix-id': req.headers['svix-id'],
    'svix-timestamp': req.headers['svix-timestamp'],
    'svix-signature': req.headers['svix-signature']
  };

  const secrect = process.env.WEBHOOK_SECRET;
  const wh = new Webhook(secrect);
  const evt = wh.verify(payload, svixHeaders); // verify webhook
  
  console.log("evt is - ", evt);

  const {id, email_addresses, image_url, external_accounts, first_name, last_name, username, profile_image_url } = evt.data;

  if(evt.type === 'user.created') {
    // create user on dbs
    const newUser = await User.create({
      clerkId: id,
      email: email_addresses[0]?.email_address,
      image: image_url,
      authProviders: [
        {
          provider: external_accounts?.length > 0 ? external_accounts[0].provider : "email",
          providerId: external_accounts?.length > 0 ? external_accounts[0].provider_user_id : email_addresses[0]?.id 
        }
      ]
    })

    if(!newUser) {
      throw new ApiError(
        400,
        "User is already have in dbs"
      )
    }

    let generated_username = "";
    if(!username) {
      // create a loop to check that the username is already exist on dbs or not
      generated_username = generateUsername(first_name || email_addresses[0].email_address.slice(0, 3));
      while(await usernameAvailable(generated_username)) {
        generated_username = generateUsername(first_name || email_addresses[0].email_address.slice(0, 3));
      }
    }

    await UserProfile.create({
      userId: new mongoose.Types.ObjectId(newUser._id),
      firstName: first_name || "author",
      lastName: last_name || "dev",
      username: username || generated_username,
      bio: "",
      description: ""
    })

    await UserSetting.create({
      userId: newUser._id
    })
    
    return res
    .status(200)
    .json(
      new ApiResponse(
        201,
        "User Create successfully"
      )
    )
    
  } else if (evt.type === 'user.updated') {
      const updatedUser = await User.findOne(
        {
          clerkId: id
        }
      )
      if(profile_image_url) {
        updatedUser.image = profile_image_url;
        await updatedUser.save();
      }
      await UserProfile.findOneAndUpdate(
        {
          userId: updatedUser._id
        },
        {
          $set: {
            firstName: first_name,
            lastName: last_name
          }
        }
      )

      return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "User profile update successfully"
        )
      )
  } else {
      // user -> user profile -> post -> like -> comment -> user setting -> favorites -> postviews -> relationship

      const deletedUser = await User.findOneAndDelete({
        clerkId: evt.data.id
      });
      await UserProfile.findOneAndDelete({userId: deletedUser._id});
      await UserSetting.findOneAndDelete({
        userId: deletedUser._id
      })
      const posts = await Post.find(
        {
          userId: deletedUser._id
        }
      )
      posts?.map(async (post) => {
        const postId = post._id;
        // delete all photos form imagekit
        post.media?.map(async(f) => {
            await deleteFile(f.fileId);
        })
        // delete comment
        await Comment.deleteMany({
            postId
        })
        // delete likes
        await Like.deleteMany({
            postId
        })
        // delete favorites
        await Favorite.deleteOne({
            postId
        }),
        // delete postView
        await PostView.deleteOne({
            postId
        })
      })

      await FollowRelationship.deleteMany({
        $or: [
          {
            userId: deletedUser._id
          },
          {
            followedUserId: deletedUser._id
          }
        ]
      })

      return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "User delted successfully"
        )
      )
  }
});

const usernameAvailable = async(username) => {
  try {
    return await UserProfile.exists({username}) !== null;
  } catch (error) {
    throw new ApiError(
      400,
      `ERROR: check availablity of username ${error.message}`
    )
  }
}

export { authenticateWithClerk, usernameAvailable };
