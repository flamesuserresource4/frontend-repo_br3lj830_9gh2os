import { useEffect, useMemo, useState } from "react";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import UsernameModal from "./components/UsernameModal";

// This frontend provides a polished single-room chat UI using localStorage for name.
// Networking is intentionally omitted so you can host it anywhere now.
// For real-time multi-user chat later, you can replace the persistence with your PHP/MySQL backend.

function App() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);

  // Demo seed so the UI doesn't look empty. Remove when wiring to backend.
  useEffect(() => {
    const stored = localStorage.getItem("chat_username");
    if (stored) setUsername(stored);
  }, []);

  const participantsCount = useMemo(() => {
    // Since there's no backend in this template, show at least 1.
    return Math.max(1, new Set(messages.map((m) => m.author)).size || (username ? 1 : 0));
  }, [messages, username]);

  const handleJoin = (name) => {
    setUsername(name);
    localStorage.setItem("chat_username", name);
  };

  const handleSend = (text) => {
    const now = new Date();
    const hh = now.getHours().toString().padStart(2, "0");
    const mm = now.getMinutes().toString().padStart(2, "0");
    const msg = {
      id: `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
      author: username || "You",
      text,
      time: `${hh}:${mm}`,
    };
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <div className="mx-auto flex h-screen max-w-4xl flex-col rounded-none sm:rounded-xl sm:border sm:border-gray-200 sm:shadow-lg overflow-hidden">
        <ChatHeader roomName="#general" participantsCount={participantsCount} />
        <MessageList messages={messages} currentUser={username} />
        <MessageInput onSend={handleSend} disabled={!username} />
      </div>

      <UsernameModal isOpen={!username} onSubmit={handleJoin} />
    </div>
  );
}

export default App;
