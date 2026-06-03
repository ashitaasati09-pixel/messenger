"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#ffffff",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#1a1a2e",
      overflowX: "hidden",
    }}>

      {/* Navbar */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.2rem 3rem",
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
      }}>
        <span style={{
          fontSize: "1.4rem",
          fontWeight: 800,
          color: "#6366f1",
        }}>
          💬 Messenger
        </span>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Link href="/login" style={{
            border: "1.5px solid #6366f1",
            color: "#6366f1",
            padding: "0.55rem 1.4rem",
            borderRadius: "8px",
            fontWeight: 600,
            textDecoration: "none",
            fontSize: "0.9rem",
          }}>
            Log In
          </Link>
          <Link href="/signup" style={{
            background: "#6366f1",
            color: "#fff",
            padding: "0.55rem 1.4rem",
            borderRadius: "8px",
            fontWeight: 600,
            textDecoration: "none",
            fontSize: "0.9rem",
          }}>
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero - Two Column */}
      <section style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "5rem 3rem",
        gap: "3rem",
        flexWrap: "wrap",
      }}>

        {/* Left: Text */}
        <div style={{ flex: 1, minWidth: "280px", maxWidth: "480px" }}>
          <h1 style={{
            fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            margin: "0 0 1.5rem 0",
            color: "#111111",
            letterSpacing: "-1px",
          }}>
            Chat with the <br />
            <span style={{ color: "#6366f1" }}>people you love.</span>
          </h1>

          <p style={{
            fontSize: "1.1rem",
            color: "#6b7280",
            lineHeight: 1.75,
            margin: "0 0 2.5rem 0",
          }}>
            Simple, fast, and secure messaging for everyone.
            Connect instantly with friends and family — anywhere, anytime.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/signup" style={{
              background: "#6366f1",
              color: "#fff",
              padding: "0.9rem 2rem",
              borderRadius: "10px",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "1rem",
              boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
            }}>
              Get Started Free
            </Link>
            <Link href="/login" style={{
              background: "#f5f5ff",
              color: "#6366f1",
              padding: "0.9rem 2rem",
              borderRadius: "10px",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "1rem",
            }}>
              Log In →
            </Link>
          </div>

          {/* Trust row */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            marginTop: "2rem",
          }}>
            {["😊","😎","🙂","😄","🥳"].map((e, i) => (
              <div key={i} style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: ["#f472b6","#818cf8","#34d399","#fbbf24","#60a5fa"][i],
                border: "2px solid #fff",
                marginLeft: i === 0 ? 0 : "-8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}>{e}</div>
            ))}
            <span style={{ fontSize: "0.85rem", color: "#9ca3af", marginLeft: "8px" }}>
              Join 10,000+ users
            </span>
          </div>
        </div>

        {/* Right: Chat UI Mockup */}
        <div style={{
          flex: 1,
          minWidth: "280px",
          maxWidth: "400px",
          position: "relative",
        }}>

          {/* Phone frame */}
          <div style={{
            background: "#fff",
            borderRadius: "28px",
            boxShadow: "0 20px 60px rgba(99,102,241,0.15), 0 4px 20px rgba(0,0,0,0.08)",
            padding: "1.5rem",
            border: "1px solid #ebebf5",
            position: "relative",
            zIndex: 2,
          }}>

            {/* Chat header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.25rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid #f3f4f6",
            }}>
              <div style={{
                width: "40px", height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #818cf8, #6366f1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.1rem",
              }}>😊</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111" }}>Sarah</div>
                <div style={{ fontSize: "0.75rem", color: "#22c55e", fontWeight: 500 }}>● Online</div>
              </div>
              <div style={{ marginLeft: "auto", fontSize: "1.2rem" }}>📞</div>
            </div>

            {/* Messages */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>

              {/* Received */}
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #818cf8, #6366f1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem", flexShrink: 0,
                }}>😊</div>
                <div style={{
                  background: "#f3f4f6",
                  borderRadius: "18px 18px 18px 4px",
                  padding: "0.6rem 1rem",
                  fontSize: "0.88rem",
                  color: "#374151",
                  maxWidth: "75%",
                }}>
                  Hey! Are you free tonight? 🎉
                </div>
              </div>

              {/* Sent */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{
                  background: "#6366f1",
                  borderRadius: "18px 18px 4px 18px",
                  padding: "0.6rem 1rem",
                  fontSize: "0.88rem",
                  color: "#fff",
                  maxWidth: "75%",
                }}>
                  Yes! Let's catch up 😄
                </div>
              </div>

              {/* Received */}
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #818cf8, #6366f1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem", flexShrink: 0,
                }}>😊</div>
                <div style={{
                  background: "#f3f4f6",
                  borderRadius: "18px 18px 18px 4px",
                  padding: "0.6rem 1rem",
                  fontSize: "0.88rem",
                  color: "#374151",
                  maxWidth: "75%",
                }}>
                  Amazing! See you at 7 🕖
                </div>
              </div>

              {/* Sent */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{
                  background: "#6366f1",
                  borderRadius: "18px 18px 4px 18px",
                  padding: "0.6rem 1rem",
                  fontSize: "0.88rem",
                  color: "#fff",
                  maxWidth: "75%",
                }}>
                  Can't wait! ❤️
                </div>
              </div>
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "#f9fafb",
              borderRadius: "12px",
              padding: "0.6rem 0.9rem",
              border: "1px solid #e5e7eb",
            }}>
              <span style={{ fontSize: "1rem" }}>😊</span>
              <span style={{ flex: 1, fontSize: "0.85rem", color: "#9ca3af" }}>Type a message...</span>
              <div style={{
                background: "#6366f1",
                borderRadius: "8px",
                width: "30px", height: "30px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.85rem",
              }}>➤</div>
            </div>
          </div>

          <div style={{
            position: "absolute",
            top: "-18px",
            right: "-18px",
            background: "#fff",
            borderRadius: "16px",
            padding: "0.5rem 0.9rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#111",
            zIndex: 3,
            border: "1px solid #f0f0f0",
          }}>
            <span style={{
              width: "8px", height: "8px",
              borderRadius: "50%", background: "#22c55e",
              display: "inline-block",
            }} />
            3 new messages
          </div>

          <div style={{
            position: "absolute",
            bottom: "20px",
            left: "-20px",
            background: "#fff",
            borderRadius: "50px",
            padding: "0.45rem 0.85rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            fontSize: "1rem",
            zIndex: 3,
            border: "1px solid #f0f0f0",
          }}>
            ❤️ 24
          </div>
        </div>
      </section>

      <footer style={{
        textAlign: "center",
        padding: "1.5rem",
        borderTop: "1px solid #f0f0f0",
        color: "#9ca3af",
        fontSize: "0.85rem",
      }}>
        © 2025 Messenger. All rights reserved.
      </footer>

    </main>
  );
}