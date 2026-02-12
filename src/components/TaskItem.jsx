import { useState } from "react";

function TaskItem({ text, onUpdate, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(text);

  const handleSave = () => {
    const trimmed = editValue.trim();
    if (trimmed !== text) onUpdate(trimmed);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditValue(text);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-2 py-1 group">
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full rounded border border-gray-300 px-2 py-1 text-sm text-black focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="w-full text-left text-sm text-gray-800 hover:bg-gray-50 rounded px-2 py-1 -mx-2"
          >
            {text || <span className="text-gray-400 italic">Empty</span>}
          </button>
        )}
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={!canMoveUp}
          className="p-1 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Move up"
        >
          ↑
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={!canMoveDown}
          className="p-1 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Move down"
        >
          ↓
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
