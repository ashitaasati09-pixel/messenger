"use server";

import { connectDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/user";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function signupAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const email    = formData.get("email")    as string;

  if (!username || !password || !email) {
    return { error: "All fields are required." };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  await connectDB();

  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    return { error: "Username or email already exists." };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await User.create({ username, email, password: hashedPassword });

  redirect("/login");
}