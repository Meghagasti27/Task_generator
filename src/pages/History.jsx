import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecentSpecs } from "../services/api";

function History() {
  const [specs, setSpecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRecentSpecs()
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.specs ?? [];
        setSpecs(list.slice(0, 5));
      })
      .catch(() => setError("Failed to load recent specs"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-black mb-6">Recent Specs</h1>

        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && specs.length === 0 && (
          <p className="text-gray-600">No specs yet.</p>
        )}

        <div className="space-y-4">
          {specs.map((s) => (
            <Link
              key={s.id}
              to={`/spec/${s.id}`}
              className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <p className="text-black font-medium line-clamp-2">
                {(s.goal || s.featureGoal || "").slice(0, 100)}
                {(s.goal || s.featureGoal || "").length > 100 ? "…" : ""}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {s.createdAt
                  ? new Date(s.createdAt).toLocaleDateString()
                  : "—"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;
