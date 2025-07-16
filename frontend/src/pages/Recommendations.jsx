import React, { useState } from "react";
import Toast from "../components/Toast";
import { getRecommendations } from "../api/api";

const Recommendations = () => {
  const [missingSkills, setMissingSkills] = useState("");
  const [courses, setCourses] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const handleRecommend = async (e) => {
    e.preventDefault();
    const skillsArr = missingSkills.split(",").map((s) => s.trim()).filter(Boolean);
    if (!skillsArr.length) return;
    try {
      const { data } = await getRecommendations(skillsArr);
      setCourses(data.courses || []);
      setToast({ message: "Recommendations fetched!", type: "success" });
    } catch (err) {
      setToast({ message: "Failed to fetch recommendations.", type: "error" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4">Course Recommendations</h2>
      <form onSubmit={handleRecommend} className="mb-6">
        <input
          type="text"
          className="w-full border rounded p-2 mb-2"
          placeholder="Enter missing skills, comma separated (e.g. Python, SQL)"
          value={missingSkills}
          onChange={(e) => setMissingSkills(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Get Recommendations
        </button>
      </form>
      <div className="grid gap-4">
        {courses.map((course, idx) => (
          <div key={idx} className="bg-gray-100 rounded p-4 shadow">
            <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
            <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {course.platform || "Course Link"}
            </a>
          </div>
        ))}
      </div>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "success" })} />
    </div>
  );
};

export default Recommendations; 