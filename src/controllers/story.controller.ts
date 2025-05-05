import { isValidObjectId } from "mongoose";
import { STORIES } from "../constant.js";
import { ApiRes } from "../utils/response.js";
import { Story } from "../models/story.model.js";
import { asyncGuard } from "../utils/asyncGuard.js";
import {
  deleteFileFromCloud,
  uploadFileOneCloud,
} from "../helpers/cloudinary.helper.js";

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

const deleteStory = asyncGuard(async (req, res) => {
  const _id = req.params.storyId;
  const currentId = req.user?._id;

  if (!isValidObjectId(_id)) {
    return res.status(400).json(new ApiRes(400, "Valid Story id is required"));
  }

  const story = await Story.findById(_id);

  if (!story) {
    return res.status(400).json(new ApiRes(400, "Story not found"));
  }

  if (story.createdBy !== currentId) {
    return res
      .status(400)
      .json(new ApiRes(400, "Not authorized to delete this story"));
  }

  if (story.storyType && story.storyPublicId) {
    await deleteFileFromCloud(story.storyPublicId, story.storyType);
  }

  await Story.findByIdAndDelete(_id);

  return res.status(200).json(new ApiRes(200, "Story deleted"));
});

const getStory = asyncGuard(async (req, res) => {
  const _id = req.params.storyId;

  if (!isValidObjectId(_id)) {
    return res.status(400).json(new ApiRes(400, "Valid Story id is required"));
  }

  const story = await Story.findById(_id);
  if (!story) return res.status(404).json(new ApiRes(404, "Story not found"));

  return res.status(200).json(new ApiRes(200, "story", story));
});

const whoViewMyStory = asyncGuard(async (req, res) => {
  return res.status(200).json(new ApiRes(200, "Story viewed"));
});

export { uploadStory, deleteStory, getStory, whoViewMyStory };
