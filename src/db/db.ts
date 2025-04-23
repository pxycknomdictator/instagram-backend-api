import { connect } from "mongoose";
import { configs } from "../constant.js";

if (!configs.MONGODB_DATABASE_CONNECTION) {
  throw new Error("mongodb connection string is required in .env file");
}

export async function database() {
  try {
    await connect(`${configs.MONGODB_DATABASE_CONNECTION}`);
    console.log("DATABASE: connected successfully 📡");
  } catch (error) {
    console.error(`Failed to connect database: ${error}`);
    process.exit(1);
  }
}
