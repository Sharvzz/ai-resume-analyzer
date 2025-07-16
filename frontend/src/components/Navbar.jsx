import { Link } from "react-router-dom";
import { useResume } from "../ResumeContext.jsx";

const Navbar = () => {
  const { resumeData } = useResume();
  return (
    <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center shadow-lg rounded-b-2xl">
      <div className="font-extrabold text-2xl tracking-tight">
        <Link to="/">AI Resume Analyzer</Link>
      </div>
      <div className="space-x-6">
        <Link to="/upload-resume" className="hover:text-accent font-semibold transition-colors duration-200">Upload Resume</Link>
        {resumeData && (
          <>
            <Link to="/paste-jd" className="hover:text-accent font-semibold transition-colors duration-200">Paste JD</Link>
            <Link to="/skill-gap" className="hover:text-accent font-semibold transition-colors duration-200">Skill Gap</Link>
            <Link to="/recommendations" className="hover:text-accent font-semibold transition-colors duration-200">Recommendations</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 