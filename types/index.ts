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

export type CoverImage = {
  secure_url: string;
  public_id: string;
  [key: string]: number | string | boolean | unknown[];
};
export interface BlogData {
  title: string;
  body: string;
  slug: string;
  tags: string;
  image: CoverImage;
  audioUrl?: string | null;
}
