import { AVATAR } from "../constant.js";
import { ApiRes } from "../utils/response.js";
import { User } from "../models/user.model.js";
import { asyncGuard } from "../utils/asyncGuard.js";
import { uploadFileOneCloud } from "../helpers/cloudinary.helper.js";
import { PasswordSchema } from "../validators/user.validator.js";
import { decodePassword, hashPassword } from "../helpers/password.helper.js";

const currentUser = asyncGuard(async (req, res) => {
  const _id = req.user?._id;
  const user = await User.findById(_id).select("-password -refreshToken");

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

  if (!filePath) {
    return res.status(400).json(new ApiRes(400, "File is required"));
  }

  const link = await uploadFileOneCloud(filePath, AVATAR);

  if (!link) {
    return res.status(400).json(new ApiRes(400, "Failed to upload file"));
  }

  const user = await User.findByIdAndUpdate(
    _id,
    { avatar: link },
    { new: true },
  ).select("-password -refreshToken -email");

  return res.status(200).json(new ApiRes(200, "File uploaded", user?.avatar));
});

const changePassword = asyncGuard(async (req, res) => {
  const _id = req.user?._id;
  const { oldPassword, newPassword }: PasswordSchema = req.body;

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

export {
  getUser,
  currentUser,
  getFollowers,
  getFollowing,
  updateAvatar,
  changePassword,
};
