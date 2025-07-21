import { Schema, model } from 'mongoose';

const userSettingSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        theme: {
            type: String,
            enum: ['light', 'dark'],
            default: 'light',
        },
        language: {
            type: String,
            default: 'en',
        },
        country: {
            type: String,
            default: 'India',
        },
    }
)

const UserSetting =  model('UserSetting', userSettingSchema);
export default UserSetting;