"use client";
import { useState } from "react";
import { signupAction } from "@/app/lib/actions/auth";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const result = await signupAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex",
      alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 400, background: "#fff", borderRadius: 12,
        padding: "36px 32px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb" }}>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#111" }}>Quiz</h1>
        </div>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5",
            color: "#dc2626", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Username</label>
            <input type="text" name="username" placeholder="Enter your username"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = "#6366f1")}
              onBlur={e => (e.target.style.borderColor = "#d1d5db")} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <input type={showPassword ? "text" : "password"} name="password"
                placeholder="Enter your password"
                style={{ ...inputStyle, paddingRight: 40 }}
                onFocus={e => (e.target.style.borderColor = "#6366f1")}
                onBlur={e => (e.target.style.borderColor = "#d1d5db")} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "#9ca3af" }}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Email</label>
            <input type="email" name="email" placeholder="you@gmail.com"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = "#6366f1")}
              onBlur={e => (e.target.style.borderColor = "#d1d5db")} />
          </div>

          <button type="submit" disabled={loading}
            style={{ width: "100%", padding: "11px", background: loading ? "#a5b4fc" : "#6366f1",
              border: "none", borderRadius: 8, color: "#fff", fontSize: 15, fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#6b7280" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#6366f1", textDecoration: "none", fontWeight: 600 }}>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}