import { Hash, Users } from "lucide-react";

function ChatHeader({ roomName = "#general", participantsCount = 1 }) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow">
          <Hash size={20} />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800 leading-tight">{roomName}</h1>
          <p className="text-xs text-gray-500">Single group chat</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Users size={18} />
        <span className="text-sm font-medium">{participantsCount}</span>
      </div>
    </header>
  );
}

export default ChatHeader;
