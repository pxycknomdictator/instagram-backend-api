import * as argon2 from "argon2";
import { configs } from "../constant.js";

export async function hashPassword(password: string) {
  return await argon2.hash(password, {
    hashLength: configs.ARGON2_ROUND as number,
  });
}
