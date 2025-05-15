import { Schema, Document } from "mongoose";

interface MessageSchema extends Document {
  _id: Schema.Types.ObjectId;
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  message: string;
  delivered: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export { MessageSchema };
