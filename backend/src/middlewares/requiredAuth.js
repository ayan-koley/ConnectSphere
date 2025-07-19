import { ApiError } from "../utils/ApiError.js"

export const requiredAuth = (req, res, next) => {
    if(!req.auth || !req.auth.userId) {
        return res.json(
            new ApiError(
                401,
                "Unauthorized"
            )
        )
    }
    next()
}