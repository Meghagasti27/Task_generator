import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SpecView from "./pages/SpecView";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-3 flex gap-6">
          <Link to="/" className="text-gray-700 hover:text-black">
            Home
          </Link>
          <Link to="/history" className="text-gray-700 hover:text-black">
            History
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spec/:id" element={<SpecView />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
