import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecById } from "../services/api";
import TaskList from "../components/TaskList";
import ExportButton from "../components/ExportButton";

function SpecView() {
  const { id } = useParams();
  const [spec, setSpec] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    getSpecById(id)
      .then((data) => {
        setSpec({
          id: data.id,
          goal: data.goal || data.featureGoal || "",
          userStories: data.userStories || [],
          engineeringTasks: data.engineeringTasks || [],
          risks: data.risks || [],
        });
      })
      .catch(() => setError("Failed to load spec"))
      .finally(() => setLoading(false));
  }, [id]);

  const updateSpec = (field, value) => {
    setSpec((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!spec) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold text-black flex-1">{spec.goal}</h2>
          <ExportButton spec={spec} />
        </div>

        <TaskList
          items={spec.userStories}
          onItemsChange={(items) => updateSpec("userStories", items)}
          title="User Stories"
        />

        <TaskList
          items={spec.engineeringTasks}
          onItemsChange={(items) => updateSpec("engineeringTasks", items)}
          title="Engineering Tasks"
        />

        <TaskList
          items={spec.risks}
          onItemsChange={(items) => updateSpec("risks", items)}
          title="Risks / Unknowns"
        />
      </div>
    </div>
  );
}

export default SpecView;
