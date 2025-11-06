import { LogOut, Plus, User } from "lucide-react";

function UsersSidebar({ users, activeKey, onSelect, currentUser, onNewDM, onLogout }) {
  const isActive = (key) => key === activeKey;

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-700">Conversations</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={onNewDM}
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="New message"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={onLogout}
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
      <nav className="flex h-[calc(100vh-3.25rem)] flex-col gap-1 overflow-y-auto p-2">
        <button
          onClick={() => onSelect("group:general")}
          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
            isActive("group:general") ? "bg-indigo-100 text-indigo-700" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-xs text-white">#</span>
          <div className="flex flex-col text-left">
            <span className="font-medium">#general</span>
            <span className="text-xs text-gray-500">Group chat</span>
          </div>
        </button>

        <div className="mt-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Direct messages</div>
        <div className="mt-1" />
        {users
          .filter((u) => u.name !== currentUser)
          .map((u) => {
            const key = `dm:${u.name}`;
            return (
              <button
                key={u.id}
                onClick={() => onSelect(key)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive(key) ? "bg-indigo-100 text-indigo-700" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-200 text-gray-700">
                  <User className="h-4 w-4" />
                </span>
                <div className="flex flex-col text-left">
                  <span className="font-medium">{u.name}</span>
                  <span className="text-xs text-gray-500">{u.status || "Available"}</span>
                </div>
              </button>
            );
          })}
      </nav>
    </aside>
  );
}

export default UsersSidebar;
