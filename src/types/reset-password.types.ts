import { Schema, Document } from "mongoose";

interface PasswordReset extends Document {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  passwordResetCode: number;
  expireAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export { PasswordReset };
