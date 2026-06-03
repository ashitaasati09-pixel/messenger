"use server";

import { cookies } from "next/headers";
import { connectDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/user";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function updateProfileAction(formData: FormData) {
  const cookieStore = await cookies();
  const sessionUser = cookieStore.get("session_user");
  if (!sessionUser) redirect("/login");

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;

  if (!username || !email) return { error: "All fields are required." };

  await connectDB();

  const existing = await User.findOne({
    $or: [{ username }, { email }],
    _id: { $ne: sessionUser.value },
  });
  if (existing) return { error: "Username or email already taken." };

  await User.findByIdAndUpdate(sessionUser.value, { username, email });
  return { success: "Profile updated successfully!" };
}

export async function changePasswordAction(formData: FormData) {
  const cookieStore = await cookies();
  const sessionUser = cookieStore.get("session_user");
  if (!sessionUser) redirect("/login");

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!currentPassword || !newPassword || !confirmPassword)
    return { error: "All fields are required." };
  if (newPassword.length < 6)
    return { error: "New password must be at least 6 characters." };
  if (newPassword !== confirmPassword)
    return { error: "New passwords do not match." };

  await connectDB();

  const user = await User.findById(sessionUser.value);
  if (!user) redirect("/login");

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) return { error: "Current password is incorrect." };

  user.password = await bcrypt.hash(newPassword, 12);
  await user.save();
  return { success: "Password changed successfully!" };
}