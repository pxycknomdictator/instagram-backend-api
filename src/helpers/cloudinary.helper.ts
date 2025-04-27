import fs from "node:fs/promises";
import { v2 as cloudinary } from "cloudinary";
import { configs } from "../constant.js";

cloudinary.config({
  cloud_name: configs.CLOUDINARY_CLOUD_NAME,
  api_key: configs.CLOUDINARY_API_KEY,
  api_secret: configs.CLOUDINARY_API_SECRET,
});

export const uploadFileOneCloud = async (
  filePath: string,
  whichFolder: string,
) => {
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      folder: whichFolder,
      resource_type: "auto",
    });

    await fs.unlink(filePath);
    return response.secure_url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    await fs.unlink(filePath);
    throw new Error("Failed to upload file to Cloudinary");
  }
};
