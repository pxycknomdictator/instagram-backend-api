import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { asyncGuard } from "../utils/asyncGuard.js";
import { ApiRes } from "../utils/response.js";

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

export const conversations = asyncGuard(async (req, res) => {
  const sender = req.user?.username;
  const receiver = req.params.username;

  if (!receiver) {
    return res
      .status(400)
      .json(new ApiRes(400, "Receiver username is required."));
  }

  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 20;

  if (isNaN(page) || page < 1) {
    return res
      .status(400)
      .json({ error: "Invalid page number. Must be a positive integer." });
  }

  if (isNaN(limit) || limit < 1 || limit > 100) {
    return res
      .status(400)
      .json({ error: "Invalid limit. Must be between 1 and 100." });
  }

  const [messages, totalMessages] = await Promise.all([
    Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),

    Message.countDocuments({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }),
  ]);

  const data = {
    messages,
    pagination: {
      page,
      limit,
      total: totalMessages,
      pages: Math.ceil(totalMessages / limit),
    },
  };

  return res.status(200).json(new ApiRes(200, "conversations", data));
});

export const deleteMessage = asyncGuard(async (req, res) => {
  const _id = req.user?._id;
  const { messageId } = req.params;

  const message = await Message.findById(messageId);
  if (!message) throw new Error("Message not found");

  if (message.sender.toString() !== _id?.toString()) {
    throw new Error("Not authorized to delete this message");
  }

  await Message.findByIdAndDelete(messageId);
  res.status(204).json(new ApiRes(204, "Message Deleted"));
});
