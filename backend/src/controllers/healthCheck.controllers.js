import { ApiResponse } from "../utils/ApiResponse.js";

const healthCheck = (req, res) => {
    res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Server is healthy and running ✅"
        )
    )
}

export {
    healthCheck
}