import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function History() {
  const [specs, setSpecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch("/api/specs?limit=5")
      .then((res) => {
        if (!res.ok) {
          return res
            .json()
            .then((data) => {
              throw new Error(data?.error || `HTTP ${res.status}`);
            })
            .catch((parseErr) => {
              throw new Error(`HTTP ${res.status}`);
            });
        }
        return res.json();
      })
      .then((data) => {
        setSpecs(Array.isArray(data) ? data : data?.specs ?? []);
      })
      .catch((err) => {
        const msg =
          err?.message === "Failed to fetch" || err?.name === "TypeError"
            ? "Backend unavailable"
            : err?.message || "Failed to load specs";
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-black mb-6">History</h1>
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
              className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md"
            >
              <p className="text-black font-medium">
                {(s.goal || "").slice(0, 100)}
                {(s.goal || "").length > 100 ? "…" : ""}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : ""}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;
