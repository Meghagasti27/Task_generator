import { useEffect, useState } from "react";
import API from "../services/api";

function Status() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/status")
      .then((res) => setStatus(res.data))
      .catch((err) => {
        console.error("Status API error:", err?.response?.status, err?.message);
        setError("Failed to load status");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!status) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-black mb-6">Status</h1>
        <ul className="space-y-2">
          <li className="flex gap-2">
            <span className="text-gray-700">Backend:</span>
            <span className={status.backend ? "text-green-600" : "text-red-600"}>
              {status.backend ? "OK" : "Down"}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-gray-700">Database:</span>
            <span className={status.database ? "text-green-600" : "text-red-600"}>
              {status.database ? "OK" : "Down"}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-gray-700">LLM:</span>
            <span className={status.llm ? "text-green-600" : "text-red-600"}>
              {status.llm ? "OK" : "Down"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Status;
