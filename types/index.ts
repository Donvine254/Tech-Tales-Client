import { Blog, User } from "@prisma/client";

export interface BlogWithUser extends Blog {
  author: Pick<User, "username" | "picture">;
}

export type Session = {
  email: string;
  exp: number;
  picture: string;
  role: string;
  userId: number;
  username: string;
};
export type FormStatus = "pending" | "loading" | "success" | "error";
