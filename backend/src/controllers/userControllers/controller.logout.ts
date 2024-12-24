import { ApiResponse } from "../../utils/ApiResponse"
import { asyncHandler } from "../../utils/asyncHandler"

export const logoutUser = asyncHandler(async (req, res) => {
	return res
		.clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: 'none' })
		.status(200)
		.json(new ApiResponse(200, "Logout successful", {}))
})
