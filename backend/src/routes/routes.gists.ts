import { Router } from "express";
import { authMiddleware } from "../middlewares/middleware.auth";

const gistRouter = Router()

gistRouter.route("/currentUser").get(authMiddleware, currentUserController)

export {
	gistRouter
}
