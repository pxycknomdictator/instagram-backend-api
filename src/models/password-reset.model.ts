import { Schema, model } from "mongoose";
import { ONE_MINUTE_IN_MS } from "../constant.js";
import { PasswordReset } from "../types/reset-password.types.js";

const passwordReset = new Schema<PasswordReset>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    passwordResetCode: { type: String, required: true },
    expireAt: {
      type: Date,
      default: () => new Date(Date.now() + 5 * ONE_MINUTE_IN_MS),
      index: { expires: 0 },
    },
  },
  { timestamps: true },
);

export const Reset = model<PasswordReset>("Reset", passwordReset);
