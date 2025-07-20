import { Schema, model } from 'mongoose';

const postViewSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    totalView: {
        type: Number,
        default: 0
    }
});


const PostView = model('PostView', postViewSchema);

export default PostView;
