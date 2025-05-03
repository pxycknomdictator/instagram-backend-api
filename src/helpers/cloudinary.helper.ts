import fs from "node:fs/promises";
import { v2 as cloudinary } from "cloudinary";
import { configs } from "../constant.js";

cloudinary.config({
  cloud_name: configs.CLOUDINARY_CLOUD_NAME,
  api_key: configs.CLOUDINARY_API_KEY,
  api_secret: configs.CLOUDINARY_API_SECRET,
});

if (
  !configs.CLOUDINARY_API_KEY ||
  !configs.CLOUDINARY_API_SECRET ||
  !configs.CLOUDINARY_CLOUD_NAME
) {
  throw new Error("Cloudinary api required for");
}

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
    return {
      imagePublicId: response.public_id,
      link: response.secure_url,
      fileType: response.resource_type,
    };
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    await fs.unlink(filePath);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

export const deleteFileFromCloud = async (
  publicId: string,
  resource_type: string,
) => {
  try {
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type,
    });

    if (response.result !== "ok") {
      throw new Error(`Cloudinary deletion failed: ${response.result}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw new Error("Failed to delete file from Cloudinary");
  }
};
