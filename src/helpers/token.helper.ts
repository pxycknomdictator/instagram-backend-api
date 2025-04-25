import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { UserInfo } from "../types/token.types.js";
import { configs } from "../constant.js";

function accessTokenGenerator(payload: UserInfo) {
  return jwt.sign(payload, configs.JWT_ACCESS_TOKEN_SECRET_KEY!);
}

function refreshTokenGenerator(_id: ObjectId) {
  return jwt.sign({ _id }, configs.JWT_REFRESH_TOKEN_SECRET_KEY!);
}

function tokensGenerator(payload: UserInfo) {
  const accessToken = accessTokenGenerator(payload);
  const refreshToken = refreshTokenGenerator(payload._id);
  return [accessToken, refreshToken];
}

export { accessTokenGenerator, refreshTokenGenerator, tokensGenerator };
