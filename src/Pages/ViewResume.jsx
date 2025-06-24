import { useEffect } from "react";
import Plain from "../Components/templates/Plain";
import Sb2nov from "../Components/templates/Sb2nov";
import Template3 from "../Components/templates/Template3";
import { useNavigate } from "react-router-dom";
import { template } from "handlebars";

export default function viewResume() {
  // Get resume from local storage
  const resume = JSON.parse(localStorage.getItem("resume"));
  const resumeTemplate = JSON.parse(localStorage.getItem("resumeTemplate"));
  const navigate = useNavigate();
  const templates = {
    plain: <Plain />,
    sb2nov: <Sb2nov />,
    template3: <Template3 />,
  };
  const selectedTemplate = templates[resumeTemplate] || <Sb2nov />;

  // Function to download the resume as PDF
  const downloadResume = async () => {};
  // Check if JD is provided, if not redirect to JD page
  useEffect(() => {
    if (!resume) {
      alert("Create profile first");
      navigate("/resume");
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div>{selectedTemplate}</div>
      <div className="flex justify-center mt-4">
        <button
          onClick={downloadResume}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download Resume
        </button>
      </div>
    </div>
  );
}
