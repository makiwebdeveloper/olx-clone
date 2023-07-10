import EditProfileForm from "@/components/EditProfileForm";

export default function Settings() {
  return (
    <main className="bg-white shadow-sm p-6 2xl:p-10 rounded-lg h-[calc(100vh-60px)] sm:h-auto">
      <h1 className="text-4xl 2xl:text-6xl font-bold">Settings</h1>
      <p className="text-slate-400 mb-4 mt-2">
        Here you can change your profile data
      </p>
      <EditProfileForm />
    </main>
  );
}
