import { Router } from "express";
import { createUserController } from "../controllers/userControllers/controller.createUser";
import { signinController } from "../controllers/userControllers/controller.signin";

const userRouter = Router()

userRouter.route("/create").post(createUserController)
userRouter.route("/signin").post(signinController)

export {
	userRouter
}
