import * as bcrypt from "bcryptjs";
// import { argon2id, argon2idBinary } from "argon2-browser";
import * as crypto from "crypto";

export type Algorithm = "SHA-256" | "Bcrypt" | "Argon2";

export interface EncryptionResult {
  encryptedPassword: string;
  hashingDetails: string;
}

export const encryptPassword = async (
  password: string,
  algorithm: Algorithm
): Promise<EncryptionResult> => {
  let encryptedPassword: string;
  let hashingDetails: string;

  switch (algorithm) {
    case "SHA-256":
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto
        .pbkdf2Sync(password, salt, 10000, 32, "sha256")
        .toString("hex");
      encryptedPassword = `$sha256$${salt}$${hash}`;
      hashingDetails = `PBKDF2-HMAC-SHA256,
      10,000 iterations,
      256-bit salt`;
      break;
    case "Bcrypt":
      const bcryptSalt = await bcrypt.genSalt(10);
      encryptedPassword = await bcrypt.hash(password, bcryptSalt);
      hashingDetails = "Bcrypt, 10 rounds";
      break;
    // case "Argon2":
    //   const argon2Salt = crypto.randomBytes(16);
    //   const argon2Hash = await argon2id.hash(password, {
    //     salt: argon2Salt,
    //     memoryCost: 65536,
    //     iterations: 3,
    //     parallelism: 4,
    //   });
    //   encryptedPassword = `$argon2id$v=1536,t=3,p=4$${argon2Salt.toString(
    //     "hex"
    //   )}$${argon2Hash}`;
    //   hashingDetails = "Argon2id, 65536 KB memory, 3 iterations, 4 parallelism";
      break;
    default:
      encryptedPassword = "Invalid algorithm";
      hashingDetails = "N/A";
  }

  return { encryptedPassword, hashingDetails };
};