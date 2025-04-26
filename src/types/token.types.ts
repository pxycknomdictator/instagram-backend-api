import { ObjectId } from "mongoose";

interface UserInfo {
  _id: ObjectId;
  username: string;
  email: string;
}

type DecodedTokenPayload = {
  _id: string;
};

export { UserInfo, DecodedTokenPayload };
