"use client";
import { useState, useEffect, useRef } from "react";
import { sendMessageAction, getMessagesAction, editMessageAction, deleteMessageAction } from "@/app/lib/actions/message";

interface User { id: string; username: string; }
interface Message { _id: string; from: string; to: string; content: string; edited: boolean; deleted: boolean; createdAt: string; }
interface Props { currentUser: { id: string; username: string }; users: User[]; }

export default function DashboardClient({ currentUser, users }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedUser) return;
    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function loadMessages() {
    if (!selectedUser) return;
    const msgs = await getMessagesAction(selectedUser.id);
    setMessages(msgs);
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !selectedUser) return;
    setSending(true);
    const formData = new FormData();
    formData.append("toUserId", selectedUser.id);
    formData.append("content", input);
    await sendMessageAction(formData);
    setInput("");
    await loadMessages();
    setSending(false);
  }

  async function handleEdit(msgId: string) {
    if (!editContent.trim()) return;
    await editMessageAction(msgId, editContent);
    setEditingId(null);
    setEditContent("");
    await loadMessages();
  }

  async function handleDelete(msgId: string) {
    await deleteMessageAction(msgId);
    await loadMessages();
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "sans-serif" }}>

      {/* Navbar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 20px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 50 }}>

        {/* Hamburger */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 6 }}>
            <span style={{ display: "block", width: 22, height: 2, background: "#374151" }}></span>
            <span style={{ display: "block", width: 22, height: 2, background: "#374151" }}></span>
            <span style={{ display: "block", width: 22, height: 2, background: "#374151" }}></span>
          </button>
          {menuOpen && (
            <div style={{ position: "absolute", top: 44, left: 0, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", zIndex: 100, minWidth: 180 }}>
              <a href="/dashboard/profile" style={{ display: "block", padding: "12px 16px", fontSize: 14, color: "#374151", textDecoration: "none", fontWeight: 600, borderBottom: "1px solid #f3f4f6" }}>✏️ Edit Profile</a>
              <a href="/dashboard/change-password" style={{ display: "block", padding: "12px 16px", fontSize: 14, color: "#374151", textDecoration: "none", fontWeight: 600 }}>🔒 Change Password</a>
            </div>
          )}
        </div>

        {/* App Name */}
        <span style={{ fontSize: 18, fontWeight: 800, color: "#6366f1", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>Messenger</span>

        {/* Logout */}
        <a href="/api/logout" style={{ fontSize: 13, color: "#fff", background: "#6366f1", padding: "7px 16px", borderRadius: 8, textDecoration: "none", fontWeight: 600 }}>Logout</a>
      </div>

      {/* Welcome */}
      <div style={{ textAlign: "center", padding: "24px 16px 12px" }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#111" }}>Welcome back, {currentUser.username}! 👋</h1>
      </div>

      {/* Main Layout */}
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 16px 32px", display: "flex", gap: 16, height: "calc(100vh - 148px)" }}>

        {/* Users List */}
        <div style={{ width: 220, background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden", flexShrink: 0 }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid #e5e7eb", fontSize: 13, fontWeight: 700, color: "#374151" }}>All Users</div>
          <div style={{ overflowY: "auto", height: "calc(100% - 48px)" }}>
            {users.length === 0 && <div style={{ padding: 16, fontSize: 13, color: "#9ca3af", textAlign: "center" }}>No other users yet</div>}
            {users.map(u => (
              <button key={u.id} onClick={() => setSelectedUser(u)}
                style={{ width: "100%", padding: "12px 16px", background: selectedUser?.id === u.id ? "#f5f3ff" : "transparent", border: "none", borderBottom: "1px solid #f3f4f6", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#6366f1", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                  {u.username[0].toUpperCase()}
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: selectedUser?.id === u.id ? "#6366f1" : "#374151" }}>{u.username}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {!selectedUser ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 40 }}>💬</div>
              <p style={{ fontSize: 14, color: "#9ca3af", margin: 0 }}>Select a user to start chatting</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div style={{ padding: "14px 18px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#6366f1", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700 }}>
                  {selectedUser.username[0].toUpperCase()}
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>{selectedUser.username}</span>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 8 }}>
                {messages.length === 0 && (
                  <div style={{ textAlign: "center", color: "#9ca3af", fontSize: 13, marginTop: 20 }}>No messages yet. Say hi! 👋</div>
                )}
                {messages.map(msg => {
                  const isMine = msg.from === currentUser.id;
                  return (
                    <div key={msg._id}
                      onMouseEnter={() => setHoveredId(msg._id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ display: "flex", justifyContent: isMine ? "flex-end" : "flex-start", position: "relative" }}>

                      <div style={{ maxWidth: "70%", position: "relative" }}>

                        {/* Edit/Delete buttons on hover — only for my messages */}
                        {isMine && !msg.deleted && hoveredId === msg._id && editingId !== msg._id && (
                          <div style={{ position: "absolute", top: -28, right: 0, display: "flex", gap: 4, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "3px 6px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", zIndex: 10 }}>
                            <button onClick={() => { setEditingId(msg._id); setEditContent(msg.content); }}
                              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#6366f1", fontWeight: 600, padding: "0 4px" }}>
                              ✏️ Edit
                            </button>
                            <button onClick={() => {
                             if (window.confirm("Are you sure you want to delete this message?")) {
                              handleDelete(msg._id);
                              }
                              }}
                              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#ef4444", fontWeight: 600, padding: "0 4px" }}>
                             🗑️ Delete
                             </button>
                          </div>
                        )}

                        {/* Edit mode */}
                        {editingId === msg._id ? (
                          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                            <input value={editContent} onChange={e => setEditContent(e.target.value)}
                              style={{ padding: "8px 12px", border: "1px solid #6366f1", borderRadius: 8, fontSize: 14, outline: "none", minWidth: 200 }}
                              onKeyDown={e => { if (e.key === "Enter") handleEdit(msg._id); if (e.key === "Escape") setEditingId(null); }} />
                            <button onClick={() => handleEdit(msg._id)} style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save</button>
                            <button onClick={() => setEditingId(null)} style={{ background: "#f3f4f6", color: "#374151", border: "none", borderRadius: 6, padding: "6px 10px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>✕</button>
                          </div>
                        ) : (
                          <div style={{ padding: "9px 14px", borderRadius: isMine ? "12px 12px 2px 12px" : "12px 12px 12px 2px", background: isMine ? "#6366f1" : "#f3f4f6", color: isMine ? "#fff" : "#111", fontSize: 14 }}>
                            {msg.deleted ? (
                              <i style={{ opacity: 0.6, fontSize: 13 }}>This message was deleted</i>
                            ) : (
                              <>
                                {msg.content}
                                {msg.edited && <span style={{ fontSize: 10, opacity: 0.7, marginLeft: 6 }}>(edited)</span>}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSend} style={{ padding: "12px 16px", borderTop: "1px solid #e5e7eb", display: "flex", gap: 10 }}>
                <input value={input} onChange={e => setInput(e.target.value)}
                  placeholder={`Message ${selectedUser.username}...`}
                  style={{ flex: 1, padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, outline: "none" }}
                  onFocus={e => (e.target.style.borderColor = "#6366f1")}
                  onBlur={e => (e.target.style.borderColor = "#d1d5db")} />
                <button type="submit" disabled={sending || !input.trim()}
                  style={{ padding: "10px 20px", background: sending || !input.trim() ? "#a5b4fc" : "#6366f1", border: "none", borderRadius: 8, color: "#fff", fontSize: 14, fontWeight: 700, cursor: sending || !input.trim() ? "not-allowed" : "pointer" }}>
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}