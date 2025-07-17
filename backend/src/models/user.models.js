import { Schema, model } from "mongoose";

const AuthProviderSchema = new Schema(
    {
        provider: {
            type: String,
            enum: ["email", "oauth_google", "oauth_facebook"]
        },
        providerId: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const userSchema = new Schema(
  {
    clerkId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        sparse: true,
        trim: true,
    },
    image: {
        type: String,
        default: "",
    },
    authProviders: [AuthProviderSchema]
  },
  {
    timestamps: true,
  }
);

userSchema.index(
    {"authProviders.provider": 1, "authProviders.providerId": 1},
    { unique: true }
)

const User = model("User", userSchema);
export default User;
