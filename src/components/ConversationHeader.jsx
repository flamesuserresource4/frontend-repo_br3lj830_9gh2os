import { Users, MessageSquare, MoreVertical, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function useClickAway(ref, onAway) {
  useEffect(() => {
    function handle(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) onAway?.();
    }
    document.addEventListener("mousedown", handle);
    document.addEventListener("touchstart", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("touchstart", handle);
    };
  }, [ref, onAway]);
}

function ConversationHeader({ title, subtitle, onOpenProfile }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useClickAway(menuRef, () => setOpen(false));

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white/70 px-4 py-3 backdrop-blur-sm relative">
      <div>
        <h1 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-indigo-600" /> {title}
        </h1>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Users className="h-4 w-4" />
        <span>Online</span>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="ml-2 inline-flex items-center justify-center rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="More"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
          {open && (
            <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenProfile?.();
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                <User className="h-4 w-4" />
                Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default ConversationHeader;
