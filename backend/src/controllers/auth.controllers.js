import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyWebhook } from "@clerk/express/webhooks";
import { Webhook } from 'svix'

const register = asyncHandler(async(req, res) => {

  const payload = JSON.stringify(req.body);
  const svixHeaders = {
    'svix-id': req.headers['svix-id'],
    'svix-timestamp': req.headers['svix-timestamp'],
    'svix-signature': req.headers['svix-signature']
};
  const secrect = process.env.WEBHOOK_SECRET;
  const wh = new Webhook(secrect)
  const evt = wh.verify(payload, svixHeaders); // verify webhook
  console.log("evt is ", evt.data)
  const {id, email_addresses, image_url, external_accounts } = evt.data;

  if(evt.type === 'user.created') {
    // create user on dbs
    await User.create({
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
    return res
    .status(200)
    .json(
      new ApiResponse(
        201,
        "User Create successfully"
      )
    )
    
  }

});

export { register };
