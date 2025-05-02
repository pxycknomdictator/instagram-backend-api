import { isValidObjectId } from "mongoose";
import { AVATAR } from "../constant.js";
import { ApiRes } from "../utils/response.js";
import { User } from "../models/user.model.js";
import { asyncGuard } from "../utils/asyncGuard.js";
import {
  deleteFileFromCloud,
  uploadFileOneCloud,
} from "../helpers/cloudinary.helper.js";
import { PasswordSchema } from "../validators/user.validator.js";
import { decodePassword, hashPassword } from "../helpers/password.helper.js";

const currentUser = asyncGuard(async (req, res) => {
  const _id = req.user?._id;
  const user = await User.findById(_id).select("-password -refreshToken");

  if (!isValidObjectId(_id)) {
    return res.status(400).json(new ApiRes(400, "Valid id is required"));
  }

  if (!user) return res.status(404).json(new ApiRes(404, "User not found"));

  return res.status(200).json(new ApiRes(200, "Current login User", user));
});

const getUser = asyncGuard(async (req, res) => {
  const username = req.params?.username;

  if (!username) {
    return res.status(400).json(new ApiRes(400, "username is required"));
  }

  const user = await User.findOne({ username }).select(
    "-password -refreshToken -email",
  );

  if (!user) return res.status(404).json(new ApiRes(404, "User not found"));

  return res.status(200).json(new ApiRes(200, "User Information", user));
});

const getFollowers = asyncGuard(async (req, res) => {
  const username = req.params?.username;
  const followers = await User.findOne({ username }, { followers: 1, _id: 0 });

  if (!followers) {
    return res.status(404).json(new ApiRes(404, "User not found"));
  }

  return res
    .status(200)
    .json(new ApiRes(200, `${username} followers`, followers));
});

const getFollowing = asyncGuard(async (req, res) => {
  const username = req.params?.username;
  const following = await User.findOne({ username }, { following: 1, _id: 0 });

  if (!following) {
    return res.status(404).json(new ApiRes(404, "User not found"));
  }

  return res
    .status(200)
    .json(new ApiRes(200, `${username} following`, following));
});

const updateAvatar = asyncGuard(async (req, res) => {
  const _id = req.user?._id;
  const filePath = req.file?.path;

  if (!isValidObjectId(_id)) {
    return res.status(400).json(new ApiRes(400, "Valid id is required"));
  }

  if (!filePath) {
    return res.status(400).json(new ApiRes(400, "File is required"));
  }

  const user = await User.findById(_id);
  if (!user) return res.status(404).json(new ApiRes(404, "User not found"));

  if (user?.imagePublicId) {
    await deleteFileFromCloud(user?.imagePublicId, user?.avatarType);
  }

  const { imagePublicId, link, fileType } = await uploadFileOneCloud(
    filePath,
    AVATAR,
  );

  if (!link && !imagePublicId && !fileType) {
    return res.status(400).json(new ApiRes(400, "Failed to upload file"));
  }

  await User.findByIdAndUpdate(
    _id,
    { avatar: link, imagePublicId, avatarType: fileType },
    { new: true },
  ).select("-password -refreshToken -email");

  return res.status(200).json(new ApiRes(200, "Avatar uploaded"));
});

const destroyAvatar = asyncGuard(async (req, res) => {
  const _id = req.user?._id;

  if (!isValidObjectId(_id)) {
    return res.status(400).json(new ApiRes(400, "valid id is required"));
  }

  const user = await User.findById(_id);
  if (!user) return res.status(404).json(new ApiRes(404, "User not found"));

  if (user.imagePublicId && user.avatarType) {
    await deleteFileFromCloud(user.imagePublicId, user.avatarType);
  }

  await User.findByIdAndUpdate(
    _id,
    {
      $unset: { avatar: 1, imagePublicId: 1, avatarType: 1 },
    },
    { new: true },
  );

  return res.status(200).json(new ApiRes(200, "Avatar is removed"));
});

const changePassword = asyncGuard(async (req, res) => {
  const _id = req.user?._id;
  const { oldPassword, newPassword }: PasswordSchema = req.body;

  if (!isValidObjectId(_id)) {
    return res.status(400).json(new ApiRes(400, "Valid id is required"));
  }

  const user = await User.findById(_id).select("+password -refreshToken");
  if (!user) return res.status(404).json(new ApiRes(404, "User not found"));

  const isPasswordCorrect = await decodePassword(user.password, oldPassword);

  if (!isPasswordCorrect) {
    return res.status(400).json(new ApiRes(400, "Password is Incorrect"));
  }

  const hash = await hashPassword(newPassword);
  await User.findByIdAndUpdate(_id, { password: hash }, { new: true });

  return res.status(200).json(new ApiRes(200, "Password changed Successfully"));
});

const followUser = asyncGuard(async (req, res) => {
  const targetUserId = req.params.userId;
  const currentUserId = req.user?._id;

  if (!isValidObjectId(targetUserId) || !isValidObjectId(currentUserId)) {
    return res.status(400).json(new ApiRes(400, "Valid ID required"));
  }

  const targetUser = await User.findById(targetUserId);

  if (!targetUser) {
    return res.status(404).json(new ApiRes(404, "User not found"));
  }

  const result = await User.updateOne(
    { _id: targetUserId, followers: { $ne: currentUserId } },
    { $addToSet: { followers: currentUserId } },
  );

  await User.updateOne(
    { _id: currentUserId, following: { $ne: targetUserId } },
    { $addToSet: { following: targetUserId } },
  );

  if (result.modifiedCount === 0) {
    return res.status(200).json(new ApiRes(200, "Already following"));
  }

  return res.status(201).json(new ApiRes(201, "Followed successfully"));
});

export {
  getUser,
  currentUser,
  getFollowers,
  getFollowing,
  updateAvatar,
  changePassword,
  destroyAvatar,
  followUser,
};
