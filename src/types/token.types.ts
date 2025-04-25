import { ObjectId } from "mongoose";

interface UserInfo {
  _id: ObjectId;
  username: string;
  email: string;
}

export { UserInfo };
