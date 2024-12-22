import { prisma } from "../../config/prisma";
import { createHash } from "../../helpers/HashPassword";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import z from "zod";

const createUserType = z.object({
	username: z.string({ message: "Username is not provided" }).trim().min(6, "The min length of username is 6").max(20, "The max length of username is 20"),
	password: z.string({ message: "Password is not provided" }).trim().min(6, "The min length of password is 6").max(20, "The max length of password is 10"),
})

export const createUserController = asyncHandler(async (req, res) => {
	const dataSentByUser = req.body;
	if (!dataSentByUser) {
		return res.status(400).json(new ApiError(400, "No request body", [], []));
	}
	// user input validations
	const parsedData = createUserType.safeParse(dataSentByUser)
	if (!parsedData.success) {
		const zodErrors: string[] = []
		parsedData.error.errors.map((err) => {
			zodErrors.push(err.message)
		})
		return res.status(400).json(new ApiError(400, "Zod errors", [], zodErrors))
	}
	try {
		const existingUserCheck = await prisma.user.findFirst({
			where: {
				username: parsedData.data.username
			}
		});
		if (existingUserCheck) {
			return res.status(400).json(new ApiError(400, "Username already taken", [], []))
		}
		const hashedPassword = await createHash(parsedData.data.password)
		const newUser = await prisma.user.create({
			data: {
				username: parsedData.data.username,
				password: hashedPassword
			},
			select: {
				username: true,
				id: true,
			}
		})
		return res.status(200).json(new ApiResponse(200, "Route hit properly", newUser))
	} catch (err) {
		console.log("error at last point")
	}
});
