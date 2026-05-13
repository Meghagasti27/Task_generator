import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function SpecDetail() {
  const { id } = useParams();

  const [spec, setSpec] = useState(null);
  const [completed, setCompleted] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load spec
  useEffect(() => {
    if (!id) return;

    API.get(`/spec/${id}`)
      .then((res) => setSpec(res.data))
      .catch(() => setError("Failed to load spec"))
      .finally(() => setLoading(false));
  }, [id]);

  // Load progress
  useEffect(() => {
    if (!id) return;

    API.get(`/progress/${id}`)
      .then((res) => {
        const map = {};

        res.data.forEach((p) => {
          map[p.taskId] = p.completed;
        });

        setCompleted(map);
      })
      .catch(() => { });
  }, [id]);

  // Toggle progress
  const toggleTask = async (taskId) => {
    const newValue = !completed[taskId];

    setCompleted((prev) => ({
      ...prev,
      [taskId]: newValue,
    }));

    try {
      await API.post("/progress", {
        specId: id,
        taskId,
        completed: newValue,
      });
    } catch (err) {
      console.error("Failed to save progress");
    }
  };

  // Download
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

    const blob = new Blob([content], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `spec-${spec.id}.txt`;

    a.click();

    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <p className="p-6 text-[#6d6960]">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="p-6 text-red-600">
        {error}
      </p>
    );
  }

  if (!spec) return null;

  // Group tasks
  const grouped = {
    week1: [],
    week2: [],
    week3: [],
    week4: [],
    risk: [],
  };

  spec.tasks.forEach((t) => {
    if (grouped[t.type]) {
      grouped[t.type].push(t);
    }
  });

  // Progress
  const taskTasks = spec.tasks.filter(
    (t) => t.type !== "risk"
  );

  const completedCount = taskTasks.filter(
    (t) => !!completed[t.id]
  ).length;

  const totalTasks = taskTasks.length;

  const progressPercent = totalTasks
    ? (completedCount / totalTasks) * 100
    : 0;

  const weeks = [
    { key: "week1", label: "Week 1 — Foundation" },
    { key: "week2", label: "Week 2 — Build" },
    { key: "week3", label: "Week 3 — Improve" },
    { key: "week4", label: "Week 4 — Launch" },
  ];

  return (
    <div
      className="paper-bg min-h-screen px-6 pt-6 pb-12"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      <style>{`
        .paper-bg {
          background-color: #faf8f3;

          background-image:
            linear-gradient(
              to right,
              rgba(140, 165, 210, 0.13) 1px,
              transparent 1px
            ),

            linear-gradient(
              to bottom,
              rgba(140, 165, 210, 0.13) 1px,
              transparent 1px
            ),

            radial-gradient(
              ellipse at 20% 10%,
              rgba(255,255,255,0.7),
              transparent 60%
            ),

            radial-gradient(
              ellipse at 80% 90%,
              rgba(230,220,200,0.35),
              transparent 60%
            );

          background-size:
            28px 28px,
            28px 28px,
            100% 100%,
            100% 100%;

          background-attachment: fixed;
        }

        .hero-title {
          font-family:
            Georgia,
            "Times New Roman",
            serif;

          letter-spacing: -0.03em;
        }

        .task-item {
          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .task-item:hover {
          background: rgba(255,255,255,0.18);
        }
      `}</style>

      <div className="max-w-3xl mx-auto">

        {/* Main Card */}
        <div className="p-5 space-y-5">

          {/* Header */}
          <div>

            <h2 className="hero-title text-[30px] font-bold text-[#111110] mb-2 leading-tight">
              {spec.goal}
            </h2>

            <p className="text-[15px] text-[#6f6b63] mb-1 leading-relaxed">
              <span className="font-medium text-[#111110]">
                Users:
              </span>{" "}
              {spec.users}
            </p>

            <p className="text-[15px] text-[#6f6b63] leading-relaxed">
              <span className="font-medium text-[#111110]">
                Constraints:
              </span>{" "}
              {spec.constraints}
            </p>

            <button
              onClick={downloadSpec}
              className="mt-4 px-5 py-2 rounded-full bg-[#111110] text-[#f5f4f0] text-sm hover:bg-[#1c1c1a] transition-all"
            >
              Download
            </button>

          </div>

          {/* Progress */}
          <div>

            <div className="flex items-center justify-between mb-2">
              <p className="text-[14px] text-[#6f6b63]">
                Progress
              </p>

              <p className="text-[14px] text-[#6f6b63]">
                {completedCount} / {totalTasks}
              </p>
            </div>

            <div className="w-full h-2 bg-[#e4dfd4] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#111110] rounded-full transition-all duration-300"
                style={{
                  width: `${progressPercent}%`,
                }}
              />
            </div>

          </div>

          {/* Weeks */}
          <div className="space-y-5">

            {weeks.map(({ key, label }) => {
              const items = grouped[key];

              if (!items || items.length === 0) return null;

              return (
                <div key={key}>

                  <h3
                    className="text-[20px] font-semibold text-[#111110] mb-2"
                    style={{
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {label}
                  </h3>

                  <ul className="space-y-1.5">

                    {items.map((t) => (
                      <li
                        key={t.id}
                        className="task-item rounded-2xl px-4 py-2.5 flex items-start gap-3"
                      >

                        <input
                          type="checkbox"
                          id={`task-${t.id}`}
                          checked={!!completed[t.id]}
                          onChange={() => toggleTask(t.id)}
                          className="mt-1 cursor-pointer scale-105"
                        />

                        <label
                          htmlFor={`task-${t.id}`}
                          className={`cursor-pointer text-[15px] leading-6 ${completed[t.id]
                            ? "line-through text-[#aaa59b]"
                            : "text-[#4e4a43]"
                            }`}
                        >
                          {t.title}
                        </label>

                      </li>
                    ))}

                  </ul>

                </div>
              );
            })}

            {/* Risks */}
            {grouped.risk.length > 0 && (
              <div>

                <h3
                  className="text-[20px] font-semibold text-[#111110] mb-2"
                  style={{
                    fontFamily: "Georgia, serif",
                  }}
                >
                  Risks
                </h3>

                <ul className="space-y-1.5">

                  {grouped.risk.map((t) => (
                    <li
                      key={t.id}
                      className="text-[15px] text-[#5c5851] leading-6"
                    >
                      • {t.title}
                    </li>
                  ))}

                </ul>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default SpecDetail;