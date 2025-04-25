import { UserInfo } from "./token.types.js";

declare global {
  namespace Express {
    interface Request {
      user?: UserInfo;
    }
  }
}
