import { getAuthData } from "@/data/auth-data";
import { getUserData } from "@/data/user-data";
import { redirect } from "next/navigation";
import { ProfileForm } from "./_components/profile-form";

export default async function ProfilePage() {
  const authData = await getAuthData();
  if (!authData?.session) redirect("/signin");

  const user = authData.user;
  const userData = await getUserData(user.id);

  return (
    <main className="w-full flex flex-col gap-4">
      <section className="mx-auto w-full max-w-2xl">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-3xl ">profile</h1>
        </div>
        <ProfileForm user={userData} />
      </section>
    </main>
  );
}
