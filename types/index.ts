export type BlogStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type CommentStatus = "VISIBLE" | "HIDDEN";
export type UserRole = "USER" | "ADMIN";
export interface Blog {
  id: number;
  title: string;
  body: string;
  slug: string;
  image: Record<string, any>;
  tags?: string;
  author: User;
  authorId: number;
  status: BlogStatus;
  likes: number;
  views: number;
  audio?: string;
  comments: Comment[];
  createdAt: Date | string;
  updatedAt: Date | string;
  Favorite: Favorite[];
}

export interface Comment {
  id: number;
  body: string;
  author: User;
  authorId: number;
  blog: Blog;
  blogId: number;
  responses: Response[];
  status: CommentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Response {
  id: number;
  body: string;
  author: User;
  authorId: number;
  comment: Comment;
  commentId: number;
  status: CommentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Favorite {
  id: number;
  userId: number;
  blogId: number;
  user: User;
  blog: Blog;
}

export interface OTP {
  id: number;
  email: string;
  code: string;
  expiresAt: string;
  createdAt: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  image?: string;
  role: UserRole; // Adjust this to match your enum/roles
  blogs?: Blog[];
  comments?: Comment[];
  responses?: Response[];
  favorites?: Favorite[];
}
