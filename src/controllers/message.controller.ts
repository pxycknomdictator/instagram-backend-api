import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

export async function sendMessage(message: string, from: string, to: string) {
  const receiver = await User.findOne({ username: to }).select(
    "-password -refreshToken",
  );

  const sender = await User.findOne({ username: from }).select(
    "-password -refreshToken",
  );

  return await Message.create({
    message,
    sender: sender?._id,
    receiver: receiver?._id,
  });
}
