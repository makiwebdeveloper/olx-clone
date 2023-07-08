import { Post, User } from "@prisma/client";

export interface Favorite {
  id: string;
  createdAt: Date;
  post: Post;
  user: User;
}
