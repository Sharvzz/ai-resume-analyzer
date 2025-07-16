import React, { useState } from "react";
import UploadResume from "./UploadResume";
import { useResume } from "../ResumeContext.jsx";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [showUpload, setShowUpload] = useState(false);
  const { resumeData, setResumeData } = useResume();
  const navigate = useNavigate();

  if (resumeData && resumeData.text) {
    // After upload: show only extracted text, Paste JD button, and Back button
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-primary-light via-surface to-accent-light">
        <div className="bg-surface bg-opacity-95 rounded-3xl shadow-2xl p-10 md:p-20 max-w-3xl w-full text-center border border-primary-light">
          <h2 className="text-2xl font-bold mb-4">Extracted Resume Text:</h2>
          <pre className="whitespace-pre-wrap text-sm bg-gray-100 rounded p-4 text-left max-h-96 overflow-y-auto">{resumeData.text}</pre>
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
            <button
              className="bg-gradient-to-r from-primary-dark to-accent-dark text-white text-xl font-bold px-10 py-4 rounded-full shadow-lg hover:from-primary hover:to-accent transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-accent-light"
              onClick={() => navigate("/paste-jd")}
            >
              Paste JD
            </button>
            <button
              className="bg-gray-300 text-gray-800 text-xl font-bold px-10 py-4 rounded-full shadow-lg hover:bg-gray-400 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-accent-light"
              onClick={() => { setShowUpload(false); setResumeData(null); }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showUpload) {
    return <UploadResume />;
  }

  // Initial landing content
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-primary-light via-surface to-accent-light">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 md:py-32">
        <div className="bg-surface bg-opacity-95 rounded-3xl shadow-2xl p-10 md:p-20 max-w-3xl w-full text-center border border-primary-light">
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary-dark mb-6 drop-shadow-xl tracking-tight font-sans">
            AI Resume Skill Gap Analyzer & Career Recommender
          </h1>
          <p className="text-lg md:text-2xl text-muted mb-10 font-medium leading-relaxed font-sans">
            Upload your resume and a job description to discover your skill gaps and get personalized course recommendations to boost your career!
          </p>
          <button
            onClick={() => setShowUpload(true)}
            className="inline-block bg-gradient-to-r from-primary-dark to-accent-dark text-white text-xl font-bold px-10 py-5 rounded-full shadow-lg hover:from-primary hover:to-accent transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-accent-light font-sans"
          >
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage; 