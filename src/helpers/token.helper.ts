import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { configs } from "../constant.js";
import { UserInfo } from "../types/token.types.js";

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

function parseCookie(cookieHeader: string) {
  return Object.fromEntries(
    cookieHeader.split(";").map((c) => c.trim().split("=")),
  );
}

function tokenDecoder(token: string) {
  try {
    const payload = jwt.verify(token, configs.JWT_ACCESS_TOKEN_SECRET_KEY!);
    return payload;
  } catch (error) {
    throw new Error("Invalid Token");
  }
}

export {
  accessTokenGenerator,
  refreshTokenGenerator,
  tokensGenerator,
  parseCookie,
  tokenDecoder,
};
