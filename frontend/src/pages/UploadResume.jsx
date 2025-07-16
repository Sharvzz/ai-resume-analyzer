import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import Toast from "../components/Toast";
import { uploadResume } from "../api/api";
import { useResume } from "../ResumeContext.jsx";

const UploadResume = () => {
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [resumeText, setResumeText] = useState("");
  const { setResumeData } = useResume();

  const handleFileSelect = async (file) => {
    if (!file) return;
    try {
      const result = await uploadResume(file);
      console.log('Upload Resume Response:', result); // Print the full response
      setResumeText(result.text); // Use result.text
      setResumeData(result); // Set in context for global access
      setToast({ message: "Resume uploaded and parsed successfully!", type: "success" });
    } catch (err) {
      setToast({ message: "Failed to upload resume.", type: "error" });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4">Upload Your Resume (PDF)</h2>
      <FileUpload onFileSelect={handleFileSelect} />
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "success" })} />
      {resumeText && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Extracted Resume Text:</h3>
          <pre className="whitespace-pre-wrap text-sm">{resumeText}</pre>
        </div>
      )}
    </div>
  );
};

export default UploadResume; 