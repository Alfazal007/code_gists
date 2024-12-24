import { Router } from "express";
import { createUserController } from "../controllers/userControllers/controller.createUser";
import { signinController } from "../controllers/userControllers/controller.signin";
import { authMiddleware } from "../middlewares/middleware.auth";
import { currentUserController } from "../controllers/userControllers/controller.currentUser";
import { getUserByName } from "../controllers/userControllers/controller.getUserByName";
import { logoutUser } from "../controllers/userControllers/controller.logout";

const userRouter = Router()

userRouter.route("/create").post(createUserController)
userRouter.route("/signin").post(signinController)
userRouter.route("/currentUser").get(authMiddleware, currentUserController)
userRouter.route("/getUser/:username").get(authMiddleware, getUserByName)
userRouter.route("/logout").post(authMiddleware, logoutUser)

export {
	userRouter
}
