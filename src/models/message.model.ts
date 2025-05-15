import { Schema, model } from "mongoose";
import { MessageSchema } from "../types/message.types.js";

const messageSchema = new Schema<MessageSchema>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    delivered: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Message = model<MessageSchema>("Message", messageSchema);
