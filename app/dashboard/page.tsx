import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/user";
import DashboardClient from "./DashboardClient";

interface UserDoc {
  _id: string;
  username: string;
  email: string;
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionUser = cookieStore.get("session_user");
  if (!sessionUser) redirect("/login");

  await connectDB();
  const user = (await User.findById(sessionUser!.value).lean()) as UserDoc | null;
  if (!user) redirect("/login");

  const allUsers = await User.find({ _id: { $ne: sessionUser.value } })
    .select("_id username")
    .lean() as { _id: string; username: string }[];

  return (
    <DashboardClient
      currentUser={{ id: user._id.toString(), username: user.username }}
      users={allUsers.map(u => ({ id: u._id.toString(), username: u.username }))}
    />
  );
}