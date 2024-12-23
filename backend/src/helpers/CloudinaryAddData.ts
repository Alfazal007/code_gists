import { v2 as cloudinary } from 'cloudinary';
import { envVariables } from '../config/envVariables';

cloudinary.config({
	cloud_name: envVariables.cloudinaryCloudName,
	api_key: envVariables.cloudinaryApiKey,
	api_secret: envVariables.cloudinaryApiSecret
});

const uploadToCloudinary = (buffer: Buffer, userId: string, gistId: string) => {
	return new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(
			{
				unique_filename: false,
				overwrite: true,
				resource_type: "raw",
				folder: `/gists/${userId}/${gistId}`,
				public_id: `${gistId}.txt`
			},
			(error, result) => {
				if (error) reject(error);
				else resolve(result);
			}
		);
		stream.end(buffer);
	});
};


export async function createCloudinaryData(data: string, userId: string, gistId: string): Promise<boolean> {
	try {
		const buffer = Buffer.from(data, 'utf-8');
		await uploadToCloudinary(buffer, userId, gistId);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export async function deleteCloudinaryDate(gistId: string, userId: string) {
	try {
		await cloudinary.uploader.destroy(`gists/${userId}/${gistId}/${gistId}.txt`, { resource_type: "raw" })
		await cloudinary.api.delete_folder(`gists/${userId}/${gistId}`)
	} catch (error) {
		console.log(error);
	}
}
