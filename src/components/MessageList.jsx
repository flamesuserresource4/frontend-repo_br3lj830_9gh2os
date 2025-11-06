import { useEffect, useRef } from "react";

function Message({ author, text, time, isOwn }) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm text-sm leading-relaxed ${
        isOwn
          ? "bg-indigo-600 text-white rounded-br-sm"
          : "bg-gray-100 text-gray-800 rounded-bl-sm"
      }`}>
        <div className="font-medium mb-0.5 opacity-90">{author}</div>
        <div>{text}</div>
        <div className={`mt-1 text-[10px] ${isOwn ? "text-indigo-100" : "text-gray-500"}`}>{time}</div>
      </div>
    </div>
  );
}

function MessageList({ messages = [], currentUser = "" }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-3 bg-gradient-to-b from-white to-gray-50">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-400 text-sm">
          No messages yet — be the first to say hi 👋
        </div>
      ) : (
        messages.map((m) => (
          <Message
            key={m.id}
            author={m.author}
            text={m.text}
            time={m.time}
            isOwn={m.author === currentUser}
          />
        ))
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;
