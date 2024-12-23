import { Router } from "express";
import { authMiddleware } from "../middlewares/middleware.auth";
import { createGistController } from "../controllers/gistController/controller.createGist";
import { getGist } from "../controllers/gistController/controller.getGist";

const gistRouter = Router()

gistRouter.route("/currentGist").post(authMiddleware, createGistController)
gistRouter.route("/get/:id").get(authMiddleware, getGist)

export {
	gistRouter
}
