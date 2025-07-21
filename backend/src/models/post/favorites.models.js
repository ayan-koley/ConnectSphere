import { Schema, model } from "mongoose";

const favoriteSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        }
    },
    {
        timestamps: true
    }
);

const Favorite = model("Favorite", favoriteSchema);

export default Favorite;
