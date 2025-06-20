import { Blog, User } from "@prisma/client";

export interface BlogWithUser extends Blog {
  author: Pick<User, "username" | "picture">;
}
