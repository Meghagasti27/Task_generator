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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await API.post("/generate", form);

      navigate(`/spec/${res.data.id}`);
    } catch (err) {
      setError(
        err?.response?.data?.error ||
        err?.message ||
        "Generation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="paper-bg min-h-screen flex items-start justify-center px-6 pt-10 pb-16"
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
              rgba(230, 220, 200, 0.35),
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
        }

        .input-style {
          width: 100%;

          background: rgba(255,255,255,0.18);

          border: 1px solid #d8d4ca;

          border-radius: 16px;

          padding: 12px 15px;

          min-height: 46px;

          resize: none;

          overflow: hidden;

          font-size: 15px;

          transition:
            border-color 0.2s ease,
            background 0.2s ease;
        }

        .input-style:focus {
          outline: none;

          border-color: #a8a39a;

          background: rgba(255,255,255,0.28);
        }

        .generate-btn {
          background: #111110;

          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .generate-btn:hover {
          background: #1c1c1a;

          transform: translateY(-1px);
        }

        .hero-title {
          font-family:
            Georgia,
            "Times New Roman",
            serif;

          letter-spacing: -0.04em;
        }
      `}</style>

      <div className="glass-card max-w-2xl w-full rounded-[28px] p-6">

        <h2 className="hero-title text-4xl font-bold text-[#111110] mb-8">
          Create Spec
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Goal */}
          <div>
            <label className="block text-sm font-medium text-[#5f5b52] mb-2">
              Goal
            </label>

            <textarea
              name="goal"
              value={form.goal}
              onChange={(e) => {
                handleChange(e);

                e.target.style.height = "auto";
                e.target.style.height =
                  e.target.scrollHeight + "px";
              }}
              rows={2}
              className="input-style"
            />
          </div>

          {/* Users */}
          <div>
            <label className="block text-sm font-medium text-[#5f5b52] mb-2">
              Users
            </label>

            <textarea
              name="users"
              value={form.users}
              onChange={(e) => {
                handleChange(e);

                e.target.style.height = "auto";
                e.target.style.height =
                  e.target.scrollHeight + "px";
              }}
              rows={2}
              className="input-style"
            />
          </div>

          {/* Constraints */}
          <div>
            <label className="block text-sm font-medium text-[#5f5b52] mb-2">
              Constraints
            </label>

            <textarea
              name="constraints"
              value={form.constraints}
              onChange={(e) => {
                handleChange(e);

                e.target.style.height = "auto";
                e.target.style.height =
                  e.target.scrollHeight + "px";
              }}
              rows={2}
              className="input-style"
            />
          </div>

          {/* Template */}
          <div>
            <label className="block text-sm font-medium text-[#5f5b52] mb-2">
              Template
            </label>

            <select
              name="template"
              value={form.template}
              onChange={handleChange}
              className="input-style"
            >
              <option value="web">Web App</option>
              <option value="mobile">Mobile App</option>
              <option value="internal">Internal Tool</option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="generate-btn w-full py-3.5 rounded-full text-[#f5f4f0] text-sm tracking-[0.04em] disabled:opacity-50"
          >
            {loading
              ? "Generating..."
              : "Generate Spec →"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateSpec;