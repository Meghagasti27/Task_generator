// import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

function TaskList({ items, onItemsChange, title, storageKey }) {
  const [completed, setCompleted] = useState({});

  /* Load saved progress */
  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) setCompleted(JSON.parse(saved));
  }, [storageKey]);

  /* Save progress */
  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(completed));
  }, [completed, storageKey]);

  const toggleComplete = (index) => {
    setCompleted((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleUpdate = (index, newText) => {
    const next = [...items];
    next[index] = newText;
    onItemsChange(next);
  };

  const handleMoveUp = (index) => {
    if (index <= 0) return;
    const next = [...items];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onItemsChange(next);
  };

  const handleMoveDown = (index) => {
    if (index >= items.length - 1) return;
    const next = [...items];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onItemsChange(next);
  };

  /* Progress */
  const total = items.length;
  const done = Object.values(completed).filter(Boolean).length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>

      {/* Progress bar (minimal UI addition) */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {done}/{total} completed
        </p>
      </div>

      <ul className="space-y-1">
        {(items || []).map((item, i) => (
          <li key={i}>
            <TaskItem
              text={typeof item === "string" ? item : item?.text ?? String(item)}
              onUpdate={{
                update: (t) => handleUpdate(i, t),
                completed: completed[i],
                toggleComplete: () => toggleComplete(i),
              }}
              onMoveUp={() => handleMoveUp(i)}
              onMoveDown={() => handleMoveDown(i)}
              canMoveUp={i > 0}
              canMoveDown={i < items.length - 1}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;