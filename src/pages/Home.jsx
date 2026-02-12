import { useNavigate } from "react-router-dom";
import FeatureForm from "../components/FeatureForm";

function Home() {
  const navigate = useNavigate();

  const handleSuccess = (id) => {
    navigate(`/spec/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-black">Tasks Generator</h1>
        <p className="text-gray-600 mt-1 mb-6">
          Turn feature ideas into structured engineering plans.
        </p>
        <FeatureForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}

export default Home;
