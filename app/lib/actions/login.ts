"use server";

import { connectDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/user";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "All fields are required." };
  }

  await connectDB();

  // Find user by username OR email
  const user = await User.findOne({
    $or: [{ username }, { email: username }],
  });

  if (!user) {
    return { error: "Invalid username or password." };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return { error: "Invalid username or password." };
  }

  // Set a simple session cookie
  const cookieStore = await cookies();
  cookieStore.set("session_user", user._id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  redirect("/dashboard"); // change to your home/dashboard route
}