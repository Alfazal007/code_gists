import { configDotenv } from "dotenv";

configDotenv({
	path: ".env"
});

export const envVariables = {
	corsOrigin: process.env.CORSORIGIN as string,
	port: parseInt(process.env.PORT as string)
}
