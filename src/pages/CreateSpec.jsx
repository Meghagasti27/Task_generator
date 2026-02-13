import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateSpec() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    goal: "",
    users: "",
    constraints: "",
    template: "web",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await API.post("/generate", form);
      navigate(`/spec/${res.data.id}`);
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-black mb-6">Create Spec</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
            <textarea
              name="goal"
              value={form.goal}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Users</label>
            <input
              name="users"
              type="text"
              value={form.users}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Constraints</label>
            <textarea
              name="constraints"
              value={form.constraints}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
            <select
              name="template"
              value={form.template}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="web">Web App</option>
              <option value="mobile">Mobile App</option>
              <option value="internal">Internal Tool</option>
            </select>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateSpec;
