import { ApiRes } from "../utils/response.js";
import { User } from "../models/user.model.js";
import { asyncGuard } from "../utils/asyncGuard.js";

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

  return res
    .status(200)
    .json(new ApiRes(200, `${username} followers`, followers));
});

export { getUser, currentUser, getFollowers };
