import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export type DecodedToken = {
  id: string;
  username: string;
  email: string;
  handle: string;
  bio: string;
  role: string;
  password_digest: string;
  status: string;
};

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);

    return decodedToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const decodeUserToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    if (!token) {
      return null;
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as DecodedToken;
    return decodedToken;
  } catch (error) {
    return null;
  }
};
