import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import UploadResume from "./pages/UploadResume";
import PasteJD from "./pages/PasteJD";
import SkillGapAnalysis from "./pages/SkillGapAnalysis";
import Recommendations from "./pages/Recommendations";
import { ResumeProvider, useResume } from "./ResumeContext.jsx";
import './App.css';
import React from "react";

function AppContent() {
  const location = useLocation();
  // Hide Navbar only on root path (LandingPage)
  const hideNavbar = location.pathname === "/";
  return (
    <div className="app-flex-col">
      {!hideNavbar && <Navbar />}
      <div className="app-flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage hideNavbar={hideNavbar} />} />
          <Route path="/upload-resume" element={<UploadResume />} />
          <Route path="/paste-jd" element={<PasteJD />} />
          <Route path="/skill-gap" element={<SkillGapAnalysis />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ResumeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ResumeProvider>
  );
}

export default App;
