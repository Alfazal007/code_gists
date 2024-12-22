import { prisma } from "../../config/prisma";
import { generateAccessToken } from "../../helpers/GenerateAccessToken";
import { createHash, verifyPassword } from "../../helpers/HashPassword";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import z from "zod";

const loginUserType = z.object({
	username: z.string({ message: "Username is not provided" }).trim().min(6, "The min length of username is 6").max(20, "The max length of username is 20"),
	password: z.string({ message: "Password is not provided" }).trim().min(6, "The min length of password is 6").max(20, "The max length of password is 10"),
})

export const signinController = asyncHandler(async (req, res) => {
	const dataSentByUser = req.body;
	if (!dataSentByUser) {
		return res.status(400).json(new ApiError(400, "No request body", [], []));
	}
	// user input validations
	const parsedData = loginUserType.safeParse(dataSentByUser)
	if (!parsedData.success) {
		const zodErrors: string[] = []
		parsedData.error.errors.map((err) => {
			zodErrors.push(err.message)
		})
		return res.status(400).json(new ApiError(400, "Zod errors", [], zodErrors))
	}
	try {
		// check user existence
		const existingUserCheck = await prisma.user.findFirst({
			where: {
				username: parsedData.data.username
			}
		});
		if (!existingUserCheck) {
			return res.status(400).json(new ApiError(400, "User does not exist", [], []))
		}
		const isValidPassword = await verifyPassword(parsedData.data.password, existingUserCheck.password)
		if (!isValidPassword) {
			return res.status(400).json(new ApiError(400, "Incorrect password", [], []))
		}
		// generate access token
		const accessToken = generateAccessToken(existingUserCheck.username, existingUserCheck.id)
		return res
			.cookie("accessToken", accessToken, { httpOnly: true, secure: true })
			.status(200)
			.json(new ApiResponse(200, "Signin successful", { username: existingUserCheck.username, id: existingUserCheck.id, accessToken }))
	} catch (err) {
		console.log("error at last point")
	}
});
