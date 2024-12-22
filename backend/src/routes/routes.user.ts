import { Router } from "express";
import { createUserController } from "../controllers/userControllers/controller.createUser";

const userRouter = Router()

userRouter.route("/create").post(createUserController)

export {
	userRouter
}
