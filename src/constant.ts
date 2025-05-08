const configs = Object.freeze({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost:27017/mydb",
  ARGON2_ROUND: process.env.ARGON2_ROUND || 20,
  JWT_ACCESS_TOKEN_SECRET_KEY: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_SECRET_KEY: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  JWT_ACCESS_TOKEN_EXPIRY_TIME: process.env.JWT_ACCESS_TOKEN_EXPIRY_TIME,
  JWT_REFRESH_TOKEN_EXPIRY_TIME: process.env.JWT_REFRESH_TOKEN_EXPIRY_TIME,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:5173",
});

const corsOptions = {
  origin: configs.CLIENT_ORIGIN,
  credentials: true,
};

const cookiesOptions = {
  httpOnly: true,
  secure: true,
};

const jsonLimit = "20mb";
const access_token = "access_token";
const refresh_token = "refresh_token";
const maxAge1 = 1000 * 60 * 60 * 24;
const maxAge2 = 1000 * 60 * 60 * 24 * 7;
const POSTS = "instagram-posts";
const AVATAR = "instagram-avatar";
const STORIES = "instagram-story";
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const ONE_MINUTE_IN_MS = 60 * 1000;
const cronStoryExpression = "0 * * * *";

export {
  configs,
  corsOptions,
  jsonLimit,
  cookiesOptions,
  access_token,
  refresh_token,
  maxAge1,
  maxAge2,
  POSTS,
  AVATAR,
  STORIES,
  ONE_DAY_IN_MS,
  cronStoryExpression,
  ONE_MINUTE_IN_MS,
};
