import axios from "axios";

const API_BASE = "https://ai-resume-analyzer-zwal.onrender.com"; // Updated to deployed backend

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file); // <-- Change here!
  const response = await axios.post(`${API_BASE}/upload-resume`, formData);
  return response.data; // This will now be { text, skills }
};

export const uploadJD = (jdText) =>
  axios.post(`${API_BASE}/upload-jd`, { jd_text: jdText });

export const getSkillGap = (resumeSkills, jdSkills) =>
  axios.post(`${API_BASE}/skill-gap`, { resume_skills: resumeSkills, jd_skills: jdSkills });

export const getRecommendations = (missingSkills) =>
  axios.post(`${API_BASE}/recommendations`, { missing_skills: missingSkills }); 