import { Socket } from "socket.io";
import { UserInfo } from "./types/token.types.js";

declare module "socket.io" {
  interface Socket {
    user?: UserInfo;
  }
}
