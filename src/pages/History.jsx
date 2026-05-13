import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function History() {
  const [specs, setSpecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    API.get("/specs?limit=5")
      .then((res) => {
        setSpecs(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        setError(err?.message || "Failed to load specs");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this spec?")) return;

    try {
      await API.delete(`/spec/${id}`);

      setSpecs((prev) =>
        prev.filter((s) => s.id !== id)
      );
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div
      className="paper-bg min-h-screen px-6 pt-10 pb-16"
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

        .glass-card {
          background: rgba(255,255,255,0.34);

          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);

          border: 1px solid rgba(220,216,208,0.7);

          box-shadow:
            0 10px 30px rgba(0,0,0,0.04);

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .glass-card:hover {
          transform: translateY(-2px);

          background: rgba(255,255,255,0.42);

          box-shadow:
            0 14px 35px rgba(0,0,0,0.06);
        }

        .hero-title {
          font-family:
            Georgia,
            "Times New Roman",
            serif;

          letter-spacing: -0.04em;
        }
      `}</style>

      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <h1 className="hero-title text-4xl font-bold text-[#111110] mb-8">
          History
        </h1>

        {/* Loading */}
        {loading && (
          <p className="text-[#6d6960]">
            Loading...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}

        {/* Empty */}
        {!loading && !error && specs.length === 0 && (
          <p className="text-[#6d6960]">
            No specs yet.
          </p>
        )}

        {/* Cards */}
        <div className="space-y-4">

          {specs.map((s) => (
            <div
              key={s.id}
              className="glass-card rounded-[24px] p-5 flex items-center justify-between"
            >

              {/* Left */}
              <Link
                to={`/spec/${s.id}`}
                className="flex-1 min-w-0 mr-4"
              >
                <p className="text-[#111110] font-medium text-[15px] truncate">
                  {(s.goal || "").slice(0, 100)}
                  {(s.goal || "").length > 100 ? "…" : ""}
                </p>

                <p className="text-sm text-[#8b877e] mt-2">
                  {s.createdAt
                    ? new Date(s.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </Link>

              {/* Delete */}
              <button
                onClick={() => handleDelete(s.id)}
                className="text-[#b05c5c] text-sm hover:text-[#8e3f3f] transition-colors shrink-0"
              >
                Delete
              </button>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default History;