import { useState } from "react";

function toMarkdown(spec) {
  const lines = [];

  if (spec.goal) {
    lines.push(`# ${spec.goal}`);
    lines.push("");
  }

  if (spec.userStories?.length) {
    lines.push("## User Stories");
    lines.push("");
    spec.userStories.forEach((s) => lines.push(`- ${s}`));
    lines.push("");
  }

  if (spec.engineeringTasks?.length) {
    lines.push("## Engineering Tasks");
    lines.push("");
    spec.engineeringTasks.forEach((t) => lines.push(`- ${t}`));
    lines.push("");
  }

  if (spec.risks?.length) {
    lines.push("## Risks / Unknowns");
    lines.push("");
    spec.risks.forEach((r) => lines.push(`- ${r}`));
  }

  return lines.join("\n");
}

function ExportButton({ spec }) {
  const [status, setStatus] = useState("");

  const handleExport = async () => {
    const md = toMarkdown(spec);
    try {
      await navigator.clipboard.writeText(md);
      setStatus("Copied to clipboard!");
    } catch {
      setStatus("Copy failed");
    }
    setTimeout(() => setStatus(""), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleExport}
        className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900"
      >
        Export as Markdown
      </button>
      {status && <span className="text-sm text-gray-600">{status}</span>}
    </div>
  );
}

export default ExportButton;
export { toMarkdown };
