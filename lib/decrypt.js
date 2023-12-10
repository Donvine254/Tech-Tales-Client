// const crypto = await import("crypto");
// const algorithm = "aes-256-cbc";

// const iv = crypto.randomBytes(16);
// // Function to encrypt user ID before storage
// export const encryptUserId = (userId, secretKey) => {
//   const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
//   const encrypted = Buffer.concat([
//     cipher.update(userId.toString(), "utf-8"),
//     cipher.final(),
//   ]);
//   return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
// };

// // Function to decrypt user ID
// export const decryptUserId = (encryptedUserId, secretKey) => {
//   const [ivString, encryptedString] = encryptedUserId.split(":");
//   const decipher = crypto.createDecipheriv(
//     algorithm,
//     Buffer.from(secretKey),
//     Buffer.from(ivString, "hex")
//   );
//   const decrypted = Buffer.concat([
//     decipher.update(Buffer.from(encryptedString, "hex")),
//     decipher.final(),
//   ]);
//   return decrypted.toString();
// };
