import { useEffect, useMemo, useState } from "react";
import UsersSidebar from "./components/UsersSidebar";
import ConversationHeader from "./components/ConversationHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";

// This UI supports a group room and personal DMs. Networking will be wired later to PHP/MySQL.

function App() {
  const [username, setUsername] = useState("");
  const [activeKey, setActiveKey] = useState("group:general");
  // conversations: { [key: string]: { messages: Message[] } }
  const [conversations, setConversations] = useState({
    "group:general": { messages: [] },
  });

  // Demo user list; in production this will come from the backend
  const [users] = useState([
    { id: "u1", name: "Alex", status: "Available" },
    { id: "u2", name: "Jordan", status: "Away" },
    { id: "u3", name: "Taylor", status: "Online" },
    { id: "u4", name: "Morgan", status: "Do not disturb" },
  ]);

  useEffect(() => {
    const storedName = localStorage.getItem("chat_username");
    if (storedName) setUsername(storedName);
  }, []);

  const ensureConversation = (key) => {
    setConversations((prev) => {
      if (prev[key]) return prev;
      return { ...prev, [key]: { messages: [] } };
    });
  };

  const handleSelectConversation = (key) => {
    ensureConversation(key);
    setActiveKey(key);
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
    setConversations((prev) => {
      const conv = prev[activeKey] || { messages: [] };
      return { ...prev, [activeKey]: { messages: [...conv.messages, msg] } };
    });
  };

  const title = useMemo(() => {
    if (activeKey.startsWith("group:")) return "#general";
    const name = activeKey.replace("dm:", "");
    return name;
  }, [activeKey]);

  const subtitle = useMemo(() => {
    if (activeKey.startsWith("group:")) return "Group chat";
    return "Direct message";
  }, [activeKey]);

  const messages = conversations[activeKey]?.messages || [];

  // Simple inline name setter to keep component count to 4
  const needsName = !username;
  const [tempName, setTempName] = useState("");

  const saveName = () => {
    const val = (tempName || "").trim();
    if (!val) return;
    setUsername(val);
    localStorage.setItem("chat_username", val);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <div className="mx-auto flex h-screen max-w-6xl overflow-hidden rounded-none sm:rounded-xl sm:border sm:border-gray-200 sm:shadow-lg">
        <UsersSidebar
          users={users}
          activeKey={activeKey}
          onSelect={handleSelectConversation}
          currentUser={username}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <ConversationHeader title={title} subtitle={subtitle} />

          {needsName && (
            <div className="border-b border-gray-200 bg-amber-50 px-4 py-2 text-sm text-amber-800">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">Set your display name:</span>
                <input
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="e.g. Casey"
                  className="h-8 rounded-md border border-amber-300 bg-white px-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  onClick={saveName}
                  className="h-8 rounded-md bg-amber-600 px-3 text-xs font-semibold text-white hover:bg-amber-700"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          <MessageList messages={messages} currentUser={username} />
          <MessageInput onSend={handleSend} disabled={!username} />
        </div>
      </div>
    </div>
  );
}

export default App;
