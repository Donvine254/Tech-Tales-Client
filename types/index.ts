import { getUserComments } from "@/lib/actions/comments";
import {
  Blog,
  Comment,
  Response,
  Role,
  User,
  UserStatus,
} from "@prisma/client";

export interface BlogWithUser
  extends Omit<Blog, "image" | "path" | "tags" | "title" | "body"> {
  tags: string;
  image: { secure_url: string };
  title: string;
  path: string;
  description: string;
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
};

export interface BlogData {
  title: string | null;
  body: string | null;
  slug: string | null;
  path: string | null;
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

export interface SocialLink {
  platform: string;
  url: string;
}
export type Preferences = {
  newsletter_subscription: boolean;
  cookies: boolean;
  analytics: boolean;
  email_notifications: boolean;
};

export interface UserProfileData {
  id: number;
  createdAt: Date;
  username: string;
  email: string;
  handle: string;
  picture: string;
  bio: string;
  role: "admin" | "user";
  branding: string;
  skills: string;
  socials: [];
  preferences: Preferences;
  keep_blogs_on_delete: boolean;
  keep_comments_on_delete: boolean;
  _count: {
    comments: number;
    blogs: number;
  };
}
export type UserComments = Awaited<ReturnType<typeof getUserComments>>;
