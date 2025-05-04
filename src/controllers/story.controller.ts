import { STORIES } from "../constant.js";
import { ApiRes } from "../utils/response.js";
import { Story } from "../models/story.model.js";
import { asyncGuard } from "../utils/asyncGuard.js";
import { uploadFileOneCloud } from "../helpers/cloudinary.helper.js";

const uploadStory = asyncGuard(async (req, res) => {
  const createdBy = req.user?._id;
  const filePath = req.file?.path;

  const payload = req.body ? { ...req.body, createdBy } : { createdBy };

  if (!filePath) {
    return res.status(400).json(new ApiRes(400, "File is required"));
  }

  const { fileType, imagePublicId, link } = await uploadFileOneCloud(
    filePath,
    STORIES,
  );

  if (!link && !imagePublicId && !fileType) {
    return res.status(500).json(new ApiRes(500, "Failed to upload file"));
  }

  payload.storyUrl = link;
  payload.storyPublicId = imagePublicId;
  payload.storyType = fileType;

  const story = await Story.create(payload);

  if (!story) {
    return res.status(500).json(new ApiRes(500, "Failed to upload story"));
  }

  return res.status(201).json(new ApiRes(201, "uploaded story", story));
});

export { uploadStory };
