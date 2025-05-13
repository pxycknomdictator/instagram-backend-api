import { ApiRes } from "../utils/response.js";
import { asyncGuard } from "../utils/asyncGuard.js";

export const healthCheck = asyncGuard(async (_, res) => {
  return res
    .status(200)
    .json(new ApiRes(200, "Docker is Awesome 🐳", "latest"));
});
