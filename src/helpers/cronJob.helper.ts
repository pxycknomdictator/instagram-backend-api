import cron from "node-cron";
import { Story } from "../models/story.model.js";
import { cronStoryExpression } from "../constant.js";
import { deleteFileFromCloud } from "../helpers/cloudinary.helper.js";

export function cronJob() {
  cron.schedule(cronStoryExpression, async () => {
    try {
      console.log("🔄 Running cron job at:", new Date().toISOString());

      const now = new Date();
      const twentyThreeHoursThirtyMinutesAgo = new Date(
        now.getTime() - (23 * 60 + 30) * 60 * 1000,
      );

      const stories = await Story.find({
        expiresAt: { $lte: twentyThreeHoursThirtyMinutesAgo },
      });

      if (stories.length === 0) {
        console.log("📭 No old stories found.");
        return;
      }

      const deletionResults = await Promise.all(
        stories.map(async (story) => {
          try {
            await deleteFileFromCloud(story.storyPublicId, story.storyType);
            console.log(`✅ Deleted: ${story.storyPublicId}`);
            return { success: true };
          } catch (error) {
            console.error(`❌ Failed to delete: ${story.storyPublicId}`, error);
            return { success: false };
          }
        }),
      );

      const successCount = deletionResults.filter((r) => r.success).length;
      console.log(
        `🧹 Successfully deleted ${successCount} of ${stories.length} files.`,
      );
    } catch (error) {
      console.error("❌ Cron job error:", error);
    }
  });
}
