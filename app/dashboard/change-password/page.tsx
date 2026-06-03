import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ChangePasswordForm from "./ChangePasswordForm";

export default async function ChangePasswordPage() {
  const cookieStore = await cookies();
  const sessionUser = cookieStore.get("session_user");
  if (!sessionUser) redirect("/login");

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 12, padding: "40px 48px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb", width: "100%", maxWidth: 420 }}>
        <div style={{ position: "relative", marginBottom: 28 }}>
        <a href="/dashboard" style={{ position: "absolute", top: -10, right: -10, fontSize: 18, textDecoration: "none", color: "#ef4444", fontWeight: 700, lineHeight: 1 }}>❌</a>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#111" }}>Change Password</h2>

        </div>
        <ChangePasswordForm />
      </div>
    </div>
  );
}