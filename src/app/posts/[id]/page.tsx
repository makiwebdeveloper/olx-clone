import { getPostById } from "@/services/posts";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function page({ params }: Props) {
  const post = await getPostById(params.id);

  if (!post) {
    redirect("/");
  }

  return <div>{post.title}</div>;
}
