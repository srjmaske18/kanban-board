import { ApiResponse } from "../utils/api-respones.js"

const healthcheck = (req, res ) =>{
    res.status(200).json(
        new ApiResponse(200, {message:"server is running"})
    )
}

export {healthcheck}