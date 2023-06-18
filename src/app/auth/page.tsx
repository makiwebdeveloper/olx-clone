import GoogleButton from "./components/GoogleButton";

export default function Auth() {
  return (
    <main className="absolute inset-0 center">
      <div className="container text-center w-[500px] 2xl:w-[750px] space-y-4">
        <h1 className="text-6xl 2xl:text-8xl font-bold">
          Welcome to our <i className="text-emerald-400">auth</i> page!
        </h1>
        <p className="text-zinc-400">
          By logging in, you agree to our Terms of Service and Privacy Policy.
          Please ensure that you are accessing this page from a trusted device
          and network.
        </p>
        <GoogleButton />
      </div>
    </main>
  );
}
