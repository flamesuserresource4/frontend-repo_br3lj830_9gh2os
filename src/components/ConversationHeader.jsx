import { Users, MessageSquare } from "lucide-react";

function ConversationHeader({ title, subtitle }) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white/70 px-4 py-3 backdrop-blur-sm">
      <div>
        <h1 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-indigo-600" /> {title}
        </h1>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Users className="h-4 w-4" />
        <span>Online</span>
      </div>
    </header>
  );
}

export default ConversationHeader;
