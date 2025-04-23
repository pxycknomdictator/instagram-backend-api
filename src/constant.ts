const configs = Object.freeze({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,
  MONGODB_DATABASE_CONNECTION:
    process.env.MONGODB_DATABASE_CONNECTION || "mongodb://localhost:27017/mydb",
  ARGON2_ROUND: process.env.ARGON2_ROUND || 20,
  JWT_ACCESS_TOKEN_SECRET_KEY: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_SECRET_KEY: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  JWT_ACCESS_TOKEN_EXPIRY_TIME: process.env.JWT_ACCESS_TOKEN_EXPIRY_TIME,
  JWT_REFRESH_TOKEN_EXPIRY_TIME: process.env.JWT_REFRESH_TOKEN_EXPIRY_TIME,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:5173",
});

const corsOptions = {
  origin: configs.CLIENT_ORIGIN,
  credentials: true,
};

const jsonLimit = "20mb";

export { configs, corsOptions, jsonLimit };
