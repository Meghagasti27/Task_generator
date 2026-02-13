import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-10 text-center">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
        SpecGen
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
        Generate structured user stories, engineering tasks, and risk analysis in seconds.
        </p>

        {/* CTA Button */}
        <Link
          to="/create"
          className="inline-block px-8 py-3 bg-slate-900 text-white text-lg font-medium rounded-xl hover:bg-slate-800 transition duration-200 shadow-md"
        >
          Generate Spec
        </Link>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mt-14 text-left">
          <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">
              Structured User Stories
            </h3>
            <p className="text-gray-600 text-sm">
              Clearly defined user-focused requirements ready for development.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">
              Engineering Task Breakdown
            </h3>
            <p className="text-gray-600 text-sm">
              Actionable implementation steps aligned with your tech stack.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">
              Risk Identification
            </h3>
            <p className="text-gray-600 text-sm">
              Highlight potential technical and product risks early.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;