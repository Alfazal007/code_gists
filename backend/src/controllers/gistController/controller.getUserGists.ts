import { prisma } from "../../config/prisma"
import { ApiError } from "../../utils/ApiError"
import { ApiResponse } from "../../utils/ApiResponse"
import { asyncHandler } from "../../utils/asyncHandler"

export const getGistsOfUser = asyncHandler(async (req, res) => {
	const { offset, userId, limit } = req.params
	try {
		if (!parseInt(userId)) {
			return res.status(400).json(new ApiError(400, "Invalid user id", []))
		}
		const gists = await prisma.gist.findMany({
			where: {
				AND: [
					{
						userId: parseInt(userId)
					},
					{
						isPublic: true
					}
				]
			},
			orderBy: {
				updatedAt: "desc"
			},
			select: {
				id: true,
				name: true,
				updatedAt: true,
			},
			take: parseInt(limit) || 10,
			skip: parseInt(offset) || 0
		})
		return res.status(200).json(new ApiResponse(200, "Got gists", gists))
	} catch (err) {
		return res.status(400).json(new ApiError(400, "Issue talking to the database", []))
	}
})
