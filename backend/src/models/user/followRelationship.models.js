import { Schema, model } from "mongoose";

const followRelationshipSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followedUserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const FollowRelationship = model('FollowRelationship', followRelationshipSchema);

export default FollowRelationship;