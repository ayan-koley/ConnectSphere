import { Schema, model } from "mongoose";

const UserProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
        required: true,
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    }
    // Add more custom fields here
  },
  { timestamps: true }
);


const UserProfile = model("UserProfile", UserProfileSchema);
export default UserProfile;
