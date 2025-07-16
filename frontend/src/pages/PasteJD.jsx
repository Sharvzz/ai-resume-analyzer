import React, { useState } from "react";
import Toast from "../components/Toast";
import { uploadJD, getSkillGap } from "../api/api";
import { useResume } from "../ResumeContext.jsx";
import { useNavigate } from "react-router-dom";

const PasteJD = () => {
  const [jd, setJD] = useState("");
  const [toast, setToast] = useState({ message: "", type: "success" });
  const { resumeData, setResumeData } = useResume();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jd.trim()) return;
    try {
      // 1. Extract JD skills from backend
      const jdRes = await uploadJD(jd);
      const jdSkills = jdRes.data?.jd_skills || jdRes.jd_skills || [];
      // 2. Get resume skills from context
      const resumeSkills = resumeData?.skills || [];
      // 3. Call skill gap endpoint
      const gapRes = await getSkillGap(resumeSkills, jdSkills);
      // 4. Store skill gap results in context for SkillGapAnalysis page
      setResumeData({ ...resumeData, jdSkills, skillGap: gapRes.data });
      setToast({ message: "Skill gap analysis complete!", type: "success" });
      // 5. Redirect to Skill Gap page
      navigate("/skill-gap");
    } catch (err) {
      setToast({ message: "Failed to analyze skill gap.", type: "error" });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4">Paste Job Description</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border rounded p-2 mb-4 min-h-[120px]"
          placeholder="Paste the job description here..."
          value={jd}
          onChange={(e) => setJD(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "success" })} />
    </div>
  );
};

export default PasteJD; 