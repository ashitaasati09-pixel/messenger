"use client";
import { useState } from "react";
import { updateProfileAction, changePasswordAction } from "@/app/lib/actions/profile";

interface Props {
  username: string;
  email: string;
}

export default function ProfileForm({ username, email }: Props) {
  const [tab, setTab] = useState<"profile" | "password">("profile");

  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box" as const,
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 14,
    color: "#111",
    background: "#fff",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 6,
  };

  async function handleProfileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setProfileMsg(null);
    const formData = new FormData(e.currentTarget);
    const result = await updateProfileAction(formData);
    if (result?.error) setProfileMsg({ type: "error", text: result.error });
    if (result?.success) setProfileMsg({ type: "success", text: result.success });
    setLoading(false);
  }

  async function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setPasswordMsg(null);
    const formData = new FormData(e.currentTarget);
    const result = await changePasswordAction(formData);
    if (result?.error) setPasswordMsg({ type: "error", text: result.error });
    if (result?.success) {
      setPasswordMsg({ type: "success", text: result.success });
      (e.target as HTMLFormElement).reset();
    }
    setLoading(false);
  }

  return (
    <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb", overflow: "hidden" }}>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
        <button onClick={() => setTab("profile")} style={{ flex: 1, padding: "14px", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", background: tab === "profile" ? "#f5f3ff" : "#fff", color: tab === "profile" ? "#6366f1" : "#6b7280", borderBottom: tab === "profile" ? "2px solid #6366f1" : "2px solid transparent" }}>
          Profile Update
        </button>
        <button onClick={() => setTab("password")} style={{ flex: 1, padding: "14px", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", background: tab === "password" ? "#f5f3ff" : "#fff", color: tab === "password" ? "#6366f1" : "#6b7280", borderBottom: tab === "password" ? "2px solid #6366f1" : "2px solid transparent" }}>
          Change Password
        </button>
      </div>

      <div style={{ padding: "32px" }}>

        {/* Profile Tab */}
        {tab === "profile" && (
          <form onSubmit={handleProfileSubmit}>
            <h2 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 800, color: "#111" }}>Update Profile</h2>

            {profileMsg && (
              <div style={{ background: profileMsg.type === "error" ? "#fef2f2" : "#f0fdf4", border: `1px solid ${profileMsg.type === "error" ? "#fca5a5" : "#86efac"}`, color: profileMsg.type === "error" ? "#dc2626" : "#16a34a", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13 }}>
                {profileMsg.text}
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Username</label>
              <input type="text" name="username" defaultValue={username} style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "#6366f1")}
                onBlur={e => (e.target.style.borderColor = "#d1d5db")} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Email</label>
              <input type="email" name="email" defaultValue={email} style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "#6366f1")}
                onBlur={e => (e.target.style.borderColor = "#d1d5db")} />
            </div>

            <button type="submit" disabled={loading} style={{ width: "100%", padding: "11px", background: loading ? "#a5b4fc" : "#6366f1", border: "none", borderRadius: 8, color: "#fff", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}

        {/* Password Tab */}
        {tab === "password" && (
          <form onSubmit={handlePasswordSubmit}>
            <h2 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 800, color: "#111" }}>Change Password</h2>

            {passwordMsg && (
              <div style={{ background: passwordMsg.type === "error" ? "#fef2f2" : "#f0fdf4", border: `1px solid ${passwordMsg.type === "error" ? "#fca5a5" : "#86efac"}`, color: passwordMsg.type === "error" ? "#dc2626" : "#16a34a", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13 }}>
                {passwordMsg.text}
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Current Password</label>
              <input type="password" name="currentPassword" placeholder="Enter current password" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "#6366f1")}
                onBlur={e => (e.target.style.borderColor = "#d1d5db")} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>New Password</label>
              <input type="password" name="newPassword" placeholder="Enter new password" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "#6366f1")}
                onBlur={e => (e.target.style.borderColor = "#d1d5db")} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Confirm New Password</label>
              <input type="password" name="confirmPassword" placeholder="Confirm new password" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "#6366f1")}
                onBlur={e => (e.target.style.borderColor = "#d1d5db")} />
            </div>

            <button type="submit" disabled={loading} style={{ width: "100%", padding: "11px", background: loading ? "#a5b4fc" : "#6366f1", border: "none", borderRadius: 8, color: "#fff", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}