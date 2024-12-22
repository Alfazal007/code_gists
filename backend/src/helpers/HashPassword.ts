import bcrypt from "bcryptjs"

export async function createHash(password: string): Promise<string> {
	const salt = await bcrypt.genSalt(12)
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword
}
