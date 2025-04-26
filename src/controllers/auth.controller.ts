import jwt from "jsonwebtoken";
import { ApiRes } from "../utils/response.js";
import { User } from "../models/user.model.js";
import { asyncGuard } from "../utils/asyncGuard.js";
import { tokensGenerator } from "../helpers/token.helper.js";
import {
  cookiesOptions,
  access_token,
  refresh_token,
  configs,
} from "../constant.js";
import { decodePassword, hashPassword } from "../helpers/password.helper.js";
import { LoginSchema, RegisterSchema } from "../validators/user.validator.js";
import { ObjectId } from "mongoose";

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

  return res
    .cookie(access_token, accessToken, {
      ...cookiesOptions,
      maxAge: 1000 * 60 * 60 * 24,
    })
    .cookie(refresh_token, refreshToken, {
      ...cookiesOptions,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .status(200)
    .json(new ApiRes(200, "Login", `${client?.username} is Logged In`));
});

const logout = asyncGuard(async (req, res) => {
  const _id = req.user?._id;

  await User.findByIdAndUpdate(_id, { $unset: { refreshToken: "" } });

  res
    .clearCookie(access_token, {
      ...cookiesOptions,
      maxAge: 1000 * 60 * 60 * 24,
    })
    .clearCookie(refresh_token, {
      ...cookiesOptions,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .status(200)
    .json(new ApiRes(200, "Logout"));
});

const renewTokens = asyncGuard(async (req, res) => {
  const incomingRefreshToken =
    req.body?.refresh_token || req.cookies?.access_token;

  if (!incomingRefreshToken) {
    return res.status(401).json(new ApiRes(401, "Token is Required"));
  }

  type DecodedTokenPayload = { _id: string };

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

  if (!user) {
    return res.status(404).json(new ApiRes(404, "User not found"));
  }

  const [accessToken, refreshToken] = tokensGenerator({
    _id: user?._id as ObjectId,
    username: user?.username as string,
    email: user?.email as string,
  });

  await User.findByIdAndUpdate(user?._id, { $set: { refreshToken } });

  return res
    .cookie(access_token, accessToken, {
      ...cookiesOptions,
      maxAge: 1000 * 60 * 60 * 24,
    })
    .cookie(refresh_token, refreshToken, {
      ...cookiesOptions,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .status(200)
    .json(new ApiRes(200, "Tokens are Renewed"));
});

export { register, login, logout, renewTokens };
