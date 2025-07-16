import React, { useRef } from "react";

const FileUpload = ({ onFileSelect }) => {
  const fileInput = useRef();

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="application/pdf"
        ref={fileInput}
        className="mb-2 hidden"
        onChange={(e) => onFileSelect(e.target.files[0])}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => fileInput.current.click()}
      >
        Choose PDF
      </button>
    </div>
  );
};

export default FileUpload; 