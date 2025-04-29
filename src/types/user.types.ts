import { Schema, Document } from "mongoose";

enum GenderType {
  male = "male",
  female = "female",
  others = "others",
}

interface UserSchema extends Document {
  _id: Schema.Types.ObjectId;
  username: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  website: string;
  imagePublicId: string;
  avatarType: string;
  bio: string;
  gender: GenderType;
  posts: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  following: Schema.Types.ObjectId[];
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export { GenderType, UserSchema };
