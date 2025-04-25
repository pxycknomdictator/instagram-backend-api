import * as argon2 from "argon2";
import { configs } from "../constant.js";

async function hashPassword(password: string) {
  return await argon2.hash(password, {
    hashLength: configs.ARGON2_ROUND as number,
  });
}

async function decodePassword(hash: string, password: string) {
  return await argon2.verify(hash, password);
}

export { hashPassword, decodePassword };
