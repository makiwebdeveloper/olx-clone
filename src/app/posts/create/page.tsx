import CreatePostForm from "./components/CreatePostForm";

export default function CreatePost() {
  return (
    <section className="bg-white shadow-sm p-6 rounded-lg">
      <h1 className="text-4xl font-bold">Create post</h1>
      <p className="text-zinc-400 mb-4">
        Easily sell your products and services by creating a post on our Olx
        Clone app.
      </p>
      <CreatePostForm />
    </section>
  );
}
