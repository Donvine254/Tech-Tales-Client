import {
  Blog,
  Comment,
  Response,
  Role,
  User,
  UserStatus,
} from "@prisma/client";

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
  authorId: number | null;
  updatedAt: Date | null;
}
export interface CommentData extends Comment {
  author: {
    username: string;
    picture: string;
    role: Role;
    status: UserStatus;
  };
  responses: ResponseData[];
}

export interface ResponseData extends Response {
  author: {
    username: string;
    picture: string;
    role: Role;
    status: UserStatus;
  };
}
