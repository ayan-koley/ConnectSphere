import mongoose from "mongoose";
import { generateUsername } from "../lib/generateUsername.js";
import User from "../models/user.models.js";
import UserProfile from "../models/userProfile.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Webhook } from 'svix'

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
  


  const {id, email_addresses, image_url, external_accounts, first_name, last_name, username } = evt.data;

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



    return res
    .status(200)
    .json(
      new ApiResponse(
        201,
        "User Create successfully"
      )
    )
    
  } else if (evt.type === 'user.updated') {
      const updatedUser = await User.findOneAndUpdate(
        {
          clerkId: id
        },
        {
          $set: [
            {
              image: image_url
            }
          ]
        }
      )
      await UserProfile.findByIdAndUpdate(
        {
          _id: updatedUser._id
        },
        {
          $set: [
            {
              firstName: first_name
            },
            {
              lastName: last_name
            }
          ]
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
        clerkId: id
      });
      await UserProfile.findOneAndDelete({userId: deletedUser._id});
      // TODO: due deltes work
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
