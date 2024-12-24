import { prisma } from "../../config/prisma"
import { ApiError } from "../../utils/ApiError"
import { ApiResponse } from "../../utils/ApiResponse"
import { asyncHandler } from "../../utils/asyncHandler"

export const getUserGistsCount = asyncHandler(async (req, res) => {
	const { userId } = req.params
	if (!userId || !parseInt(userId)) {
		return res.status(400).json(new ApiError(400, "Invalid userid", []))
	}
	let allNeeded = false
	const user = req.user
	if (user.id == parseInt(userId)) {
		allNeeded = true
	}

	try {
		const count = await prisma.gist.count({
			where: {
				userId: parseInt(userId),
				isPublic: allNeeded
			}
		})
		return res.status(200).json(new ApiResponse(200, "Found the count", count))
	} catch (err) {
		return res.status(400).json(new ApiError(400, "Issue talking to the database"))
	}
})
