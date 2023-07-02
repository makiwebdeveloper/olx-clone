import { Post } from "@prisma/client";
import PostItem from "./PostItem";

interface Props {
  posts: Post[];
}

export default function Posts({ posts }: Props) {
  return (
    <div className="my-4">
      <div className="space-y-4">
        {posts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
