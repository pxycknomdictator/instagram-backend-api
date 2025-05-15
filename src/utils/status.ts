import { User } from "../models/user.model.js";

export async function setUserOnline(_id: string): Promise<boolean> {
  try {
    const updated = await User.findByIdAndUpdate(
      _id,
      { status: "online" },
      { new: true },
    );
    return !!updated;
  } catch (error) {
    console.error("Failed to set user status:", error);
    return false;
  }
}
