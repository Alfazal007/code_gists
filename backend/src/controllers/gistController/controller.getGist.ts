import { prisma } from "../../config/prisma";
import { getCloudinaryData } from "../../helpers/CloudinaryAddData";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

export const getGist = asyncHandler(async (req, res) => {
	const { id } = req.params
	const user = req.user
	try {
		if (!id) {
			return res.status(400).json("Id not given")
		}
		const gist = await prisma.gist.findFirst({
			where: {
				id: id
			},
			select: {
				id: true,
				user: {
					select: {
						id: true
					}
				}
			}
		})
		if (!gist) {
			return res.status(400).json(new ApiError(400, "Gist not found", []))
		}
		const dataUrl = await getCloudinaryData(gist.id, gist.user.id + "")
		if (!dataUrl) {
			return res.status(400).json(new ApiError(400, "Gist not found", []))
		}
		return res.status(200).json(new ApiResponse(200, "Issue talking to the database", { url: dataUrl }))
	} catch (err) {
		return res.status(400).json(new ApiError(400, "Issue talking to the database", []))
	}
})
