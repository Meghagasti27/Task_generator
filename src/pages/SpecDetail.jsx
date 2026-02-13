import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function SpecDetail() {
  const { id } = useParams();
  const [spec, setSpec] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    API.get(`/spec/${id}`)
      .then((res) => setSpec(res.data))
      .catch(() => setError("Failed to load spec"))
      .finally(() => setLoading(false));
  }, [id]);

  const downloadSpec = () => {
    if (!spec) return;

    const content = `
Spec ID: ${spec.id}

Goal:
${spec.goal}

Users:
${spec.users}

Constraints:
${spec.constraints}

----------------------------------------

${spec.tasks
  .map((task) => `- (${task.type.toUpperCase()}) ${task.title}`)
  .join("\n")}
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `spec-${spec.id}.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!spec) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-black mb-4">{spec.goal}</h2>

        {/* Download Button */}
        <button
  onClick={downloadSpec}
  className="mb-6 px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition"
>
  Download
</button>

        {spec.tasks && spec.tasks.length > 0 && (
          <ul className="space-y-2">
            {spec.tasks.map((t) => (
              <li key={t.id} className="text-gray-800">
                {t.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SpecDetail;