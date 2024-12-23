import { Router } from "express";
import { authMiddleware } from "../middlewares/middleware.auth";
import { createGistController } from "../controllers/gistController/createGist";

const gistRouter = Router()

gistRouter.route("/currentGist").post(authMiddleware, createGistController)

export {
	gistRouter
}
