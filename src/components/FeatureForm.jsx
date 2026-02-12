import { useState } from "react";
import { generateSpec } from "../services/api";

function FeatureForm({ onSuccess }) {
  const [featureGoal, setFeatureGoal] = useState("");
  const [targetUsers, setTargetUsers] = useState("");
  const [constraints, setConstraints] = useState("");
  const [templateType, setTemplateType] = useState("Web App");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const templateOptions = ["Web App", "Mobile App", "Internal Tool"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!featureGoal.trim()) return;

    setLoading(true);
    setError("");

    try {
      const data = await generateSpec({
        featureGoal: featureGoal.trim(),
        targetUsers: targetUsers.trim(),
        constraints: constraints.trim(),
        templateType,
      });
      onSuccess(data.id);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="featureGoal" className="block text-sm font-medium text-gray-700 mb-1">
          Feature Goal <span className="text-red-500">*</span>
        </label>
        <textarea
          id="featureGoal"
          value={featureGoal}
          onChange={(e) => setFeatureGoal(e.target.value)}
          rows={4}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600"
          placeholder="Describe the feature you want to build..."
        />
      </div>

      <div>
        <label htmlFor="targetUsers" className="block text-sm font-medium text-gray-700 mb-1">
          Target Users
        </label>
        <input
          id="targetUsers"
          type="text"
          value={targetUsers}
          onChange={(e) => setTargetUsers(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600"
          placeholder="e.g. Developers, end users"
        />
      </div>

      <div>
        <label htmlFor="constraints" className="block text-sm font-medium text-gray-700 mb-1">
          Constraints
        </label>
        <textarea
          id="constraints"
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600"
          placeholder="Technical or business constraints..."
        />
      </div>

      <div>
        <label htmlFor="templateType" className="block text-sm font-medium text-gray-700 mb-1">
          Template Type
        </label>
        <select
          id="templateType"
          value={templateType}
          onChange={(e) => setTemplateType(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600"
        >
          {templateOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-slate-800 px-4 py-3 font-medium text-white hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Generating..." : "Generate Plan"}
      </button>
    </form>
  );
}

export default FeatureForm;
