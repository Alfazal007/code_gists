import { prisma } from "../../config/prisma";
import { createCloudinaryData } from "../../helpers/CloudinaryAddData";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import z from "zod";

const createGistType = z.object({
	code: z.string({ message: "Code not provided" }).trim().min(1, "Give some code"),
	isPublic: z.boolean().default(true),
	name: z.string({ message: "Gist name not provided" }).trim().min(1, "Min length is 1").max(6, "Max length is 6")
})

export const createGistController = asyncHandler(async (req, res) => {
	const user = req.user
	const data = req.body;
	if (!data) {
		return res.status(400).json(new ApiError(400, "No request body", []))
	}
	const parsedData = createGistType.safeParse(data)
	if (!parsedData.success) {
		const zodErrors: string[] = []
		parsedData.error.errors.map((err) => {
			zodErrors.push(err.message)
		})
		return res.status(400).json(new ApiError(400, "Zod errors", [], zodErrors))
	}
	try {
		const newGist = await prisma.gist.create({
			data: {
				isPublic: parsedData.data.isPublic,
				userId: user.id,
				name: parsedData.data.name
			}
		})
		const uploadToClnry = await createCloudinaryData(parsedData.data.code, user.id + "", newGist.id)
		if (!uploadToClnry) {
			await prisma.gist.delete({
				where: {
					id: newGist.id
				}
			})
		}
		return res.status(200).json(new ApiResponse(200, "Successfully created the gist", newGist))
	} catch (err) {
		return res.status(400).json(new ApiError(400, "Issue talking to the db", []))
	}
})
