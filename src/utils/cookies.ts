import { Response } from "express";
import {
  access_token,
  cookiesOptions,
  refresh_token,
  maxAge1,
  maxAge2,
} from "../constant.js";

export function setTokensInCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
) {
  res
    .cookie(access_token, accessToken, { ...cookiesOptions, maxAge: maxAge1 })
    .cookie(refresh_token, refreshToken, {
      ...cookiesOptions,
      maxAge: maxAge2,
    });
}

export function removeTokensInCookies(res: Response) {
  res
    .clearCookie(access_token, { ...cookiesOptions, maxAge: maxAge1 })
    .clearCookie(refresh_token, {
      ...cookiesOptions,
      maxAge: maxAge2,
    });
}
