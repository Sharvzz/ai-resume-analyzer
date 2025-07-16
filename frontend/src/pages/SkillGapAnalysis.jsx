import React, { useState } from "react";
import SkillDisplay from "../components/SkillDisplay";
import { useResume } from "../ResumeContext.jsx";
import { getRecommendations } from "../api/api";

const SkillGapAnalysis = () => {
  const { resumeData } = useResume();
  const matched = resumeData?.skillGap?.matched_skills || [];
  const missing = resumeData?.skillGap?.missing_skills || [];
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Hide Navbar by adding a class to body (or use context/global state for more control)
  React.useEffect(() => {
    document.body.classList.add("hide-navbar");
    return () => document.body.classList.remove("hide-navbar");
  }, []);

  const handleRecommendations = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getRecommendations(missing);
      setRecommendations(data.recommendations || data || []);
    } catch (err) {
      setError("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4">Skill Gap Analysis</h2>
      <SkillDisplay matched={matched} missing={missing} />
      {matched.length === 0 && missing.length === 0 && (
        <div className="text-gray-500 mt-4">No skill gap data available. Please upload your resume and paste a job description.</div>
      )}
      {(matched.length > 0 || missing.length > 0) && (
        <button
          className="mt-6 bg-gradient-to-r from-primary-dark to-accent-dark text-white text-lg font-bold px-8 py-3 rounded-full shadow-lg hover:from-primary hover:to-accent transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-accent-light"
          onClick={handleRecommendations}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      )}
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {recommendations.length > 0 && (
        <div className="mt-8 p-4 bg-green-50 rounded">
          <h3 className="font-semibold mb-2 text-green-800">Recommended Skills / Courses:</h3>
          <ul className="list-disc list-inside text-green-900">
            {recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SkillGapAnalysis; 