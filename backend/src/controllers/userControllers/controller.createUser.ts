import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

export const createUserController = asyncHandler(async (req, res) => {
	console.log(req.body)
	return res.status(200).json(new ApiResponse(200, "Route hit properly", {}))
});
