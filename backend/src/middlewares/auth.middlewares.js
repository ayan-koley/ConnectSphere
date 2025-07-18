import { createClerkClient } from '@clerk/backend'
import { ApiError } from '../utils/ApiError';

const clerkClient = createClerkClient({secretKey: process.env.CLERK_SECRET_KEY});

const verifyAuth = (req, res, next) => {
    const { userId } = req.auth;
    if(!userId) {
        throw new ApiError(
            404,
            "Unauthorized Request"
        );
    }

    // return userId;
    next(userId);
}

export {
    verifyAuth
}