"use client";
import { useState } from "react";
import { updateProfileAction } from "@/app/lib/actions/profile";

interface Props {
  username: string;
  email: string;
}

export default function ProfileUpdateForm({ username, email }: Props) {
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const inputStyle = { width: "100%", boxSizing: "border-box" as const, padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, color: "#111", background: "#fff", outline: "none" };
  const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const formData = new FormData(e.currentTarget);
    const result = await updateProfileAction(formData);
    if (result?.error) setMsg({ type: "error", text: result.error });
    if (result?.success) setMsg({ type: "success", text: result.success });
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {msg && (
        <div style={{ background: msg.type === "error" ? "#fef2f2" : "#f0fdf4", border: `1px solid ${msg.type === "error" ? "#fca5a5" : "#86efac"}`, color: msg.type === "error" ? "#dc2626" : "#16a34a", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13 }}>
          {msg.text}
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
  );
}