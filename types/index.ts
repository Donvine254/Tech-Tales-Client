import {
  Blog,
  Comment,
  Response,
  Role,
  User,
  UserStatus,
} from "@prisma/client";

export interface BlogWithUser
  extends Omit<Blog, "image" | "slug" | "tags" | "title" | "body"> {
  tags: string;
  image: { secure_url: string };
  title: string;
  slug: string;
  body: string;
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
  title: string | null;
  body: string | null;
  slug: string | null;
  tags: string | null;
  image: CoverImage;
  audio: string | null;
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

export interface BlogWithComments extends BlogWithUser {
  _count: {
    comments: number;
  };
}
