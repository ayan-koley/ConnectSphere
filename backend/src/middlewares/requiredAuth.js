import { ApiError } from "../utils/ApiError.js"

export const requiredAuth = (req, res, next) => {
    // req.auth = {
    //     userId: "user_30BBOsN0AFabjnK7sa5vOMOYFZW"
    // }
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