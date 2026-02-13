import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateSpec from "./pages/CreateSpec";
import SpecDetail from "./pages/SpecDetail";
import History from "./pages/History";
import Status from "./pages/Status";

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-3 flex gap-6">
          <Link to="/" className="text-gray-700 hover:text-black">Home</Link>
          <Link to="/create" className="text-gray-700 hover:text-black">Create</Link>
          <Link to="/history" className="text-gray-700 hover:text-black">History</Link>
          <Link to="/status" className="text-gray-700 hover:text-black">Status</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateSpec />} />
        <Route path="/spec/:id" element={<SpecDetail />} />
        <Route path="/history" element={<History />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
