"use server";

import { cookies } from "next/headers";
import { connectDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/user";
import { Message } from "@/app/models/message";
import { redirect } from "next/navigation";

export async function getUsersAction() {
  const cookieStore = await cookies();
  const sessionUser = cookieStore.get("session_user");
  if (!sessionUser) redirect("/login");
  await connectDB();
  const users = await User.find({ _id: { $ne: sessionUser.value } }).select("username email").lean();
  return JSON.parse(JSON.stringify(users));
}

export async function sendMessageAction(formData: FormData) {
  const cookieStore = await cookies();
  const sessionUser = cookieStore.get("session_user");
  if (!sessionUser) redirect("/login");
  const toUserId = formData.get("toUserId") as string;
  const content = formData.get("content") as string;
  if (!content?.trim()) return { error: "Message cannot be empty." };
  await connectDB();
  await Message.create({ from: sessionUser.value, to: toUserId, content: content.trim(), createdAt: new Date() });
  return { success: true };
}

export async function getMessagesAction(otherUserId: string) {
  const cookieStore = await cookies();
  const sessionUser = cookieStore.get("session_user");
  if (!sessionUser) redirect("/login");
  await connectDB();
  const messages = await Message.find({
    $or: [
      { from: sessionUser.value, to: otherUserId },
      { from: otherUserId, to: sessionUser.value },
    ],
  }).sort({ createdAt: 1 }).lean();
  return JSON.parse(JSON.stringify(messages));
}

export async function editMessageAction(messageId: string, newContent: string) {
  const cookieStore = await cookies();
  const sessionUser = cookieStore.get("session_user");
  if (!sessionUser) redirect("/login");
  if (!newContent?.trim()) return { error: "Message cannot be empty." };
  await connectDB();
  await Message.findOneAndUpdate(
    { _id: messageId, from: sessionUser.value },
    { content: newContent.trim(), edited: true }
  );
  return { success: true };
}

export async function deleteMessageAction(messageId: string) {
  const cookieStore = await cookies();
  const sessionUser = cookieStore.get("session_user");
  if (!sessionUser) redirect("/login");
  await connectDB();
  await Message.findOneAndUpdate(
    { _id: messageId, from: sessionUser.value },
    { deleted: true }
  );
  return { success: true };
}