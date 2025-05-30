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
  const currentId = req.user?._id;
  const storyId = req.params.storyId;

  if (!isValidObjectId(storyId)) {
    return res.status(400).json(new ApiRes(400, "invalid story id"));
  }

  const story = await Story.findById(storyId);
  if (!story) return res.status(404).json(new ApiRes(404, "Stroy not found"));

  const result = await Story.updateOne(
    { $and: [{ _id: storyId }, { viewBy: { $ne: currentId } }] },
    { $addToSet: { viewBy: currentId }, $inc: { viewCount: 1 } },
  );

  if (result.modifiedCount === 0) {
    return res.status(200).json(new ApiRes(200, "Already view"));
  }

  const updatedStory = await Story.findById(storyId).select("viewCount");
  return res.status(200).json(new ApiRes(200, "Story viewed", updatedStory));
});

const deleteMyAllStories = asyncGuard(async (req, res) => {
  const owner = req.user?._id;

  const stories = await Story.find({ createdBy: owner });

  if (stories.length === 0) {
    return res.status(404).json(new ApiRes(404, "No stories found"));
  }

  await Promise.all(
    stories.map((story) => {
      if (story.storyPublicId && story.storyType) {
        return deleteFileFromCloud(story.storyPublicId, story.storyType);
      }
    }),
  );

  const result = await Story.deleteMany({ createdBy: owner });

  if (!result.acknowledged) {
    return res.status(500).json(new ApiRes(500, "Failed to delete stories"));
  }

  return res.status(200).json(new ApiRes(200, "Stories deleted"));
});

export {
  uploadStory,
  deleteStory,
  getStory,
  whoViewMyStory,
  deleteMyAllStories,
};
