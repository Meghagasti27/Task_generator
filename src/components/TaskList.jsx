import TaskItem from "./TaskItem";

function TaskList({ items, onItemsChange, title }) {
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

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-black mb-4">{title}</h3>
      <ul className="space-y-1">
        {(items || []).map((item, i) => (
          <li key={i}>
            <TaskItem
              text={typeof item === "string" ? item : item?.text ?? String(item)}
              onUpdate={(t) => handleUpdate(i, t)}
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
