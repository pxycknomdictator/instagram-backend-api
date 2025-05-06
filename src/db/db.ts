import { connect } from "mongoose";
import { configs } from "../constant.js";

if (!configs.DATABASE_URL) {
  throw new Error("mongodb connection string is required in .env file");
}

export async function database() {
  try {
    await connect(`${configs.DATABASE_URL}`);
    console.log("DATABASE: connected successfully 📡");
  } catch (error) {
    console.error(`Failed to connect database: ${error} ❌`);
    process.exit(1);
  }
}
