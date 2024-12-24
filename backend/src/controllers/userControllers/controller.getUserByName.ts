import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

export const getUserByName = asyncHandler(async (req, res) => {
	const { username } = req.params
	if (!username) {
		return res.status(400).json(new ApiError(400, "No username given", []))
	}
	try {
		const userData = await prisma.user.findFirst({
			where: {
				username: username.toLowerCase()
			},
			select: {
				id: true,
			}
		})
		if (!userData) {
			return res.status(404).json(new ApiError(404, "User not found", []))
		}
		return res.status(200).json(new ApiResponse(200, "Found user", userData))
	} catch (err) {
		return res.status(400).json(new ApiError(400, "No username given", []))
	}
})
