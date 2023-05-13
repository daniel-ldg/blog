import ImageKit from "imagekit";

const imagekit = new ImageKit({
	publicKey: process.env.IMAGE_KIT_PUBLIC_KEY || "",
	privateKey: process.env.IMAGE_KIT_PRIVATE_KEY || "",
	urlEndpoint: process.env.IMAGE_KIT_END_POINT || "",
});

export interface UploadResult {
	url: string;
}

export const storeImageUrl = async (url: string, fileName: string): Promise<UploadResult> => {
	return imagekit.upload({
		file: url,
		fileName,
	});
};
