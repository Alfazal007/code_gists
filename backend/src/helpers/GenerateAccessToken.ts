import jwt from "jsonwebtoken"
import { envVariables } from "../config/envVariables"

export function generateAccessToken(username: string, id: number): string {
	const token = jwt.sign({ username, id }, envVariables.accessTokenSecret)
	return token
}
