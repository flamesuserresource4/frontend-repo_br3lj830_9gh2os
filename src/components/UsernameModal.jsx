import { useEffect, useRef, useState } from "react";

function UsernameModal({ isOpen, onSubmit }) {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = name.trim();
    if (!value) return;
    onSubmit(value);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-800">Pick a display name</h2>
        <p className="mt-1 text-sm text-gray-500">This will be visible to everyone in the room.</p>
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex"
            className="flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
}

export default UsernameModal;
