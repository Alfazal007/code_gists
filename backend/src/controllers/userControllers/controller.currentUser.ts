import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

export const currentUserController = asyncHandler(async (req, res) => {
	const currentUser = req.user
	return res.status(200).json(new ApiResponse(200, "User found", currentUser))
})

