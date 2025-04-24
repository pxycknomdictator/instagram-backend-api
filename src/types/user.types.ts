import { Schema } from "mongoose";

enum Gender {
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
  bio: string;
  gender: Gender;
  posts: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  following: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export { Gender, UserSchema };
