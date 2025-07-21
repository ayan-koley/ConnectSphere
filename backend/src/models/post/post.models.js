import { Schema, model } from 'mongoose';


const locationSchema = new Schema({
    type: {
        type: String,
        enum: ["Point"],
        default: "Point"
    },
    coordinates: {
        type: [Number],
        validate: {
            validator: function(v) {
                return !v || (Array.isArray(v) && v.length == 2 && typeof v[0] === 'number' && typeof v[1] === 'number');
            },
            message: "Coordinates must be an array of [longitude, latitude]"
        }
    }
}, { _id: false })

const PostSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    media: [
        {
            _id: false,
            url: {
                type: String
            },
            fileId: {
                type: String
            }
            
        }
    ],
    link: {
        type: String,
    },
    hashtag: {
        type: [String],
    },
    mention: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
    },
    location: {
        type: locationSchema
    }
});

PostSchema.index( { hashtag: 1 });
PostSchema.index( { mention: 1 });
PostSchema.index( { userId: 1 });
PostSchema.index( { location: '2dsphere' });


const Post = model('Post', PostSchema);

export default Post;
