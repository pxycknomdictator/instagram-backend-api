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

const HTTP_STATUS = Object.freeze({
  ok: 200,
  created: 201,
  no_content: 204,
  bad_request: 400,
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  internal_server_error: 500,
  bad_gateway: 502,
  service_unavailable: 503,
  gateway_timeout: 504,
});

const corsOptions = {
  origin: configs.CLIENT_ORIGIN,
  credentials: true,
};

const jsonLimit = "20mb";

export { HTTP_STATUS, configs, corsOptions, jsonLimit };
