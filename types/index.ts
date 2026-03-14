import type { getUserComments } from "@/lib/actions/comments";
import type { getSession } from "@/lib/actions/session-utils";
import type {
  User,
  Blog,
  Comment,
  Role,
  UserStatus,
  Response,
  UserPreferences,
} from "@/src/generated/prisma/client";

export interface BlogWithUser extends Omit<
  Blog,
  "image" | "path" | "tags" | "title" | "body"
> {
  tags: string;
  image: { secure_url: string };
  title: string;
  path: string;
  description: string;
  author: Pick<User, "username" | "picture">;
}
// TODO: update the session to reflect db session storage.
export type Session = NonNullable<Awaited<ReturnType<typeof getSession>>>;

export type AuthUser = {
  id: number; // Int to match schema
  email: string;
  role: string;
  username: string;
  picture: string | null;
};

export type FormStatus = "pending" | "loading" | "success" | "error";

export type CoverImage = {
  secure_url: string;
  public_id: string;
};
export type CommentStatus = "VISIBLE" | "FLAGGED" | "HIDDEN" | "ARCHIVED";
export interface BlogData {
  title: string | null;
  body: string | null;
  slug: string | null;
  path: string | null;
  tags: string | null;
  image: CoverImage;
  audio: string | null;
  description: string | null;
  show_comments: boolean;
}
export type BlogSettings = Pick<
  BlogData,
  "show_comments" | "description" | "audio"
>;
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
//used in blog infinite-feed fetcher
export type BlogResponse = {
  data: BlogWithComments[];
  meta: {
    page: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    hasNextPage: boolean;
    nextPage: number | null;
  };
};
export interface SocialLink {
  platform: string;
  url: string;
}

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
  userPreferences: Omit<UserPreferences, "createdAt" | "updatedAt">;
  _count: {
    comments: number;
    blogs: number;
  };
}
export type UserComments = Awaited<ReturnType<typeof getUserComments>>;
export type Preferences = Omit<UserPreferences, "createdAt" | "updatedAt">;
export interface FullBlogData extends Omit<BlogWithUser, "_count" | "author"> {
  title: string;
  body: string;
  path: string;
  tags: string;
  image: { secure_url: string };
  author: {
    username: string;
    picture: string | null;
    handle: string;
    bio: string;
    role: Role;
    socials: SocialLink[];
    branding: string;
  };
  _count: {
    comments: number;
  };
}

export type ApiKey = {
  id: string;
  userId: string;
  name: string | null;
  start: string | null;
  key: string;
  permissions: unknown;
  enabled: boolean;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  metadata: unknown;
};
