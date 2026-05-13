
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const features = [
  {
    icon: "01",
    title: "Structured User Stories",
    desc: "Clearly defined user-focused requirements ready for development.",
  },
  {
    icon: "02",
    title: "Engineering Task Breakdown",
    desc: "Actionable implementation steps aligned with your tech stack.",
  },
  {
    icon: "03",
    title: "Risk Identification",
    desc: "Highlight potential technical and product risks early.",
  },
];

function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="paper-bg min-h-screen w-full text-[#1f1f1c]"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      <style>{`
        .paper-bg {
          background-color: #faf8f3;
          background-image:
            linear-gradient(to right, rgba(140, 165, 210, 0.13) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(140, 165, 210, 0.13) 1px, transparent 1px),
            radial-gradient(ellipse at 20% 10%, rgba(255,255,255,0.7), transparent 60%),
            radial-gradient(ellipse at 80% 90%, rgba(230, 220, 200, 0.35), transparent 60%);
          background-size: 28px 28px, 28px 28px, 100% 100%, 100% 100%;
          background-attachment: fixed;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-up {
          opacity: 0;
          animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
        }

        .delay-1 { animation-delay: 0.05s; }
        .delay-2 { animation-delay: 0.15s; }
        .delay-3 { animation-delay: 0.25s; }
        .delay-4 { animation-delay: 0.35s; }
        .delay-5 { animation-delay: 0.45s; }
        .delay-6 { animation-delay: 0.55s; }

        .cta-btn {
          position: relative;
          overflow: hidden;
          transition: color 0.3s ease;
        }

        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #1b1b1a;
          transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }

        .cta-btn:hover::before {
          transform: translateX(0);
        }

        .cta-btn:hover {
          color: #f5f4f0;
        }

        .cta-btn span {
          position: relative;
          z-index: 1;
        }

        .feature-card {
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease;

          background: rgba(255,255,255,0.72);

          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);

          border: 1px solid rgba(232,230,224,0.9);
        }

        .feature-card:hover {
          transform: translateY(-4px);

          box-shadow:
            0 10px 30px rgba(0,0,0,0.06);

          background:rgba(252, 237, 223, 1);
        }

        .divider-line {
          height: 1px;
          background:
            linear-gradient(
              to right,
              transparent,
              #b8b2a7,
              transparent
            );
        }

        .brand-tag {
          font-family: "Courier New", monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #41454fff;
        }

        .hero-title {
          font-family: Georgia, "Times New Roman", serif;
          letter-spacing: -0.05em;
          line-height: 0.92;
        }
      `}</style>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center px-6 pt-16 pb-20">

        {/* Top Label */}
        {visible && (
          <p className="fade-up delay-1 brand-tag  mt-10 mb-6">
            AI-Powered Planning
          </p>
        )}

        {/* Title */}
        {visible && (
          <h1 className="fade-up delay-2 hero-title text-[clamp(3.5rem,9vw,7rem)] font-bold text-center mb-6 text-[#111110]">
            SpecGen
          </h1>
        )}

        {/* Divider */}
        {visible && (
          <div className="fade-up delay-3 divider-line w-24 mb-7" />
        )}

        {/* Subtitle */}
        {visible && (
          <p className="fade-up delay-3 text-[#5e5c57] text-lg leading-relaxed text-center max-w-xl mb-10">
            Generate structured user stories, engineering tasks, and risk analysis in seconds.
          </p>
        )}

        {/* CTA */}
        {visible && (
          <Link
            to="/create"
            className="fade-up delay-4 cta-btn inline-block px-10 py-3.5 bg-[#111110] text-[#f5f4f0] text-sm rounded-full border border-[#111110]"
            style={{
              letterSpacing: "0.04em",
              fontWeight: 500,
            }}
          >
            <span>Generate Spec →</span>
          </Link>
        )}

        {/* Features */}
        {visible && (
          <div className="fade-up delay-5 grid md:grid-cols-3 gap-5 mt-[27vh] w-full max-w-5xl">

            {features.map((f, i) => (
              <div
                key={i}
                className="feature-card rounded-2xl p-7"
              >
                <span className="brand-tag block mb-5">
                  {f.icon}
                </span>

                <h3
                  className="text-[#111110] font-semibold text-lg mb-3"
                  style={{
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {f.title}
                </h3>

                <p className="text-[#6f6d67] text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Label */}
        {visible && (
          <p className="fade-up delay-6 mt-16 text-[11px] tracking-[0.25em] uppercase text-[#b8b4aa]">
            Built for engineers & product teams
          </p>
        )}

      </main>
    </div>
  );
}

export default Home;