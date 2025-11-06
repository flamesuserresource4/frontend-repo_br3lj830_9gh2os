import { useEffect, useRef, useState } from "react";
import { Copy, Forward, MoreHorizontal, Trash2 } from "lucide-react";

function ContextMenu({ x, y, onAction, onClose }) {
  useEffect(() => {
    const handler = (e) => onClose?.();
    window.addEventListener("scroll", handler, true);
    window.addEventListener("resize", handler);
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", (e) => e.key === "Escape" && onClose?.());
    return () => {
      window.removeEventListener("scroll", handler, true);
      window.removeEventListener("resize", handler);
      document.removeEventListener("mousedown", handler);
    };
  }, [onClose]);

  return (
    <div
      className="fixed z-30 w-44 overflow-hidden rounded-md border border-gray-200 bg-white shadow-xl"
      style={{ top: y, left: x }}
    >
      <button onClick={() => onAction("copy")} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50">
        <Copy className="h-4 w-4 text-gray-600" /> Copy
      </button>
      <button onClick={() => onAction("forward")} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50">
        <Forward className="h-4 w-4 text-gray-600" /> Forward
      </button>
      <button onClick={() => onAction("delete")} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
        <Trash2 className="h-4 w-4" /> Delete
      </button>
    </div>
  );
}

function Message({ id, author, text, time, isOwn, onLongPress, onMore }) {
  const [pressing, setPressing] = useState(false);
  const timerRef = useRef(null);

  const start = (e) => {
    setPressing(true);
    timerRef.current = setTimeout(() => {
      onLongPress?.(id, e);
    }, 450);
  };
  const stop = () => {
    setPressing(false);
    clearTimeout(timerRef.current);
  };

  return (
    <div className={`group relative flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm text-sm leading-relaxed ${
          isOwn ? "bg-indigo-600 text-white rounded-br-sm" : "bg-gray-100 text-gray-800 rounded-bl-sm"
        }`}
        onMouseDown={start}
        onMouseUp={stop}
        onMouseLeave={stop}
        onTouchStart={start}
        onTouchEnd={stop}
      >
        <div className="mb-0.5 font-medium opacity-90">{author}</div>
        <div>{text}</div>
        <div className={`mt-1 text-[10px] ${isOwn ? "text-indigo-100" : "text-gray-500"}`}>{time}</div>
      </div>
      <button
        className={`absolute ${isOwn ? "left-0 -translate-x-6" : "right-0 translate-x-6"} top-1/2 -translate-y-1/2 hidden rounded-md p-1 text-gray-500 hover:bg-gray-100 group-hover:block`}
        onClick={(e) => onMore?.(id, e)}
        aria-label="Message options"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}

function MessageList({ messages = [], currentUser = "", onAction }) {
  const bottomRef = useRef(null);
  const [menu, setMenu] = useState(null); // { id, x, y }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const closeMenu = () => setMenu(null);

  const handleLongPress = (id, e) => {
    const rect = e.currentTarget.getBoundingClientRect?.() || { top: e.clientY, left: e.clientX, height: 0 };
    setMenu({ id, x: rect.left + rect.width / 2, y: rect.top + rect.height + 6 });
  };

  const handleMore = (id, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenu({ id, x: rect.left, y: rect.bottom + 6 });
  };

  const handleAction = (action) => {
    if (!menu) return;
    onAction?.(action, menu.id);
    closeMenu();
  };

  return (
    <div className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-white to-gray-50 px-3 py-4 sm:px-6">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-sm text-gray-400">No messages yet — be the first to say hi 👋</div>
      ) : (
        messages.map((m) => (
          <Message
            key={m.id}
            id={m.id}
            author={m.author}
            text={m.text}
            time={m.time}
            isOwn={m.author === currentUser}
            onLongPress={handleLongPress}
            onMore={handleMore}
          />
        ))
      )}
      {menu && (
        <ContextMenu x={menu.x} y={menu.y} onAction={handleAction} onClose={closeMenu} />
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;
