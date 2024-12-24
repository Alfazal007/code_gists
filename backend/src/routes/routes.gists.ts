import { Router } from "express";
import { authMiddleware } from "../middlewares/middleware.auth";
import { createGistController } from "../controllers/gistController/controller.createGist";
import { getGist } from "../controllers/gistController/controller.getGist";
import { getGistsOfUser } from "../controllers/gistController/controller.getUserGists";
import { getUserGistsCount } from "../controllers/gistController/controller.getCountGistsOfUser";

const gistRouter = Router()

gistRouter.route("/currentGist").post(authMiddleware, createGistController)
gistRouter.route("/get/:id").get(authMiddleware, getGist)
gistRouter.route("/getUserGists/:userId/:offset/:limit").get(authMiddleware, getGistsOfUser)
gistRouter.route("/getUserGistsCount/:userId").get(authMiddleware, getUserGistsCount)

export {
	gistRouter
}
