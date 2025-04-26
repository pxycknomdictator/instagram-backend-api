import { connect } from "mongoose";
import { configs } from "../constant.js";
import { Logger } from "../utils/logger.js";

if (!configs.DATABASE_URL) {
  throw new Error("mongodb connection string is required in .env file");
}

export async function database() {
  try {
    await connect(`${configs.DATABASE_URL}`);
    Logger.yellow("DATABASE: connected successfully 📡");
  } catch (error) {
    Logger.red(`Failed to connect database: ${error} ❌`);
    process.exit(1);
  }
}
