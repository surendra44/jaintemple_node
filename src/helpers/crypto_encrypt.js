import crypto from "crypto";

/**
 * encrypt
 * @param {String} string
 * @returns {encrypted value}
 */
export const encrypt = (body) => {
  return crypto.createHash("md5").update(body.toString()).digest("hex");
};

export const uniqueToken = () => {
  const buffer = crypto.randomBytes(48);
  return buffer.toString("hex");
};
