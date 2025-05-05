import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";

import { configs } from "../constant.js";
import { ApiRes } from "../utils/response.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { asyncGuard } from "../utils/asyncGuard.js";
import { tokensGenerator } from "../helpers/token.helper.js";
import { DecodedTokenPayload, UserInfo } from "../types/token.types.js";
import { decodePassword, hashPassword } from "../helpers/password.helper.js";
import { LoginSchema, RegisterSchema } from "../validators/user.validator.js";
import { removeTokensInCookies, setTokensInCookies } from "../utils/cookies.js";
import { deleteFileFromCloud } from "../helpers/cloudinary.helper.js";

const register = asyncGuard(async (req, res) => {
  // Don't worry bro you used middleware for body testing
  const { name, email, password, username }: RegisterSchema = req.body;

  const isExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isExists) {
    return res
      .status(409)
      .json(new ApiRes(409, "username or email is already exists"));
  }

  const hash = await hashPassword(password);
  const newUser = await User.create({ username, name, email, password: hash });

  const {
    password: pwd,
    posts,
    avatar,
    followers,
    following,
    ...response
  } = newUser.toObject();

  return res.status(201).json(new ApiRes(201, "User registered", response));
});

const login = asyncGuard(async (req, res) => {
  // Don't worry bro you used middleware for body testing
  const { email, password }: LoginSchema = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(404).json(new ApiRes(404, "Credentials Error"));

  const isPasswordCorrect = await decodePassword(user.password, password);
  if (!isPasswordCorrect) {
    return res.status(404).json(new ApiRes(404, "Credentials Error"));
  }

  const [accessToken, refreshToken] = tokensGenerator({
    _id: user._id,
    username: user.username,
    email: user.email,
  });

  const client = await User.findByIdAndUpdate(
    user._id,
    { refreshToken },
    { new: true },
  );

  setTokensInCookies(res, accessToken, refreshToken);

  return res
    .status(200)
    .json(new ApiRes(200, "Login", `${client?.username} is Logged In`));
});

const logout = asyncGuard(async (req, res) => {
  const _id = req.user?._id;

  if (!isValidObjectId(_id)) {
    return res.status(400).json(new ApiRes(400, "Valid id is required"));
  }

  await User.findByIdAndUpdate(_id, { $unset: { refreshToken: "" } });

  removeTokensInCookies(res);
  res.status(200).json(new ApiRes(200, "Logout"));
});

const renewTokens = asyncGuard(async (req, res) => {
  const incomingRefreshToken =
    req.body?.refresh_token || req.cookies?.refresh_token;

  if (!incomingRefreshToken) {
    return res.status(401).json(new ApiRes(401, "Token is Required"));
  }

  let decoded: DecodedTokenPayload;

  try {
    decoded = jwt.verify(
      incomingRefreshToken,
      configs.JWT_REFRESH_TOKEN_SECRET_KEY!,
    ) as DecodedTokenPayload;
  } catch (error) {
    return res.status(400).json(new ApiRes(400, "Invalid or Expired Token"));
  }

  const user = await User.findOne({
    $and: [{ _id: decoded._id }, { refreshToken: incomingRefreshToken }],
  })
    .select("-password")
    .lean();

  if (!user) return res.status(404).json(new ApiRes(404, "User not found"));

  const payload: UserInfo = {
    _id: user?._id,
    username: user?.username,
    email: user?.email,
  };

  const [accessToken, refreshToken] = tokensGenerator(payload);

  await User.findByIdAndUpdate(user?._id, { $set: { refreshToken } });

  setTokensInCookies(res, accessToken, refreshToken);
  return res.status(200).json(new ApiRes(200, "Tokens are Renewed"));
});

const deleteAccount = asyncGuard(async (req, res) => {
  const _id = req.user?._id;

  if (!isValidObjectId(_id)) {
    return res.status(400).json(new ApiRes(400, "Valid ID is required"));
  }

  const user = await User.findById(_id);

  if (!user) {
    return res.status(404).json(new ApiRes(404, "User not found"));
  }

  if (user.imagePublicId && user.avatarType) {
    try {
      await deleteFileFromCloud(user.imagePublicId, user.avatarType);
    } catch (err) {
      console.warn("Avatar deletion failed:", err);
    }
  }

  const posts = await Post.find({ createdBy: _id });

  await Promise.all(
    posts.map((post) => {
      if (post.postPublicId && post.postType) {
        return deleteFileFromCloud(post.postPublicId, post.postType);
      }
    }),
  );

  await Post.deleteMany({ createdBy: _id });
  await User.findByIdAndDelete(_id);

  return res.status(200).json(new ApiRes(200, "Account deleted 😢"));
});

export { register, login, logout, renewTokens, deleteAccount };
