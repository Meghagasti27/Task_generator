import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateSpec from "./pages/CreateSpec";
import SpecDetail from "./pages/SpecDetail";
import History from "./pages/History";


function App() {
  return (
    <BrowserRouter>
      <nav className="relative z-10 w-full border-b border-[#e7e3d9]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">

          {/* Left Brand */}
          <div
            className="text-[12px] tracking-[0.35em] text-[#1f1f1e] font-bold"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            SpecGen
          </div>

          {/* Right Links */}
          <div className="flex items-center gap-10 text-[12px] tracking-[0.18em] uppercase text-[#5f5f5a]">

            <Link
              to="/"
              className="hover:text-black transition-colors duration-300"
            >
              Home
            </Link>

            <Link
              to="/create"
              className="hover:text-black transition-colors duration-300"
            >
              Create
            </Link>

            <Link
              to="/history"
              className="hover:text-black transition-colors duration-300"
            >
              History
            </Link>

          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateSpec />} />
        <Route path="/spec/:id" element={<SpecDetail />} />
        <Route path="/history" element={<History />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
