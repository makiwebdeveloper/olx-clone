import EditProfileForm from "@/components/EditProfileForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Olx Clone",
  description: "Settings page for change/edit your user data",
};

export default function Settings() {
  return (
    <main className="bg-white shadow-sm p-6 2xl:p-10 rounded-lg min-h-[calc(100vh-60px)] sm:h-auto">
      <h1 className="title">Settings</h1>
      <p className="description mb-4 mt-2">
        Here you can change your profile data
      </p>
      <EditProfileForm />
    </main>
  );
}
