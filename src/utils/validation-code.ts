import { randomInt } from "crypto";

export function generateSecureValidationCode() {
  return randomInt(10000000, 99999999);
}
