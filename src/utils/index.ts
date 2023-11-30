import config from "../config";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const successResponse = (message: string, data: any) => {
  return {
    status: "success",
    message,
    data,
  };
};

export async function generateJWTToken(
  payload: any,
  secret = config.jwt.secret,
  expireDuration: string
) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        ...payload,
      },
      secret,
      { expiresIn: expireDuration },
      (err: any, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
}

export const generateTransactionReference = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomBytes = crypto.randomBytes(length);
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytes[i] % characters.length;
    result += characters.charAt(randomIndex);
  }
  return result;
};
