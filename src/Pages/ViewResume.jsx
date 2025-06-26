import { useEffect,useState, useRef } from "react";
import Plain from "../Components/templates/Plain";
import Sb2nov from "../Components/templates/Sb2nov";
import Template3 from "../Components/templates/Template3";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { set } from "mongoose";

export default function viewResume() {
  // Get resume from local storage
  const resume = JSON.parse(localStorage.getItem("resume"));
  const resumeTemplate = JSON.parse(localStorage.getItem("resumeTemplate"));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const pdfRef = useRef(null);
  const templates = {
    plain: <Plain />,
    sb2nov: <Sb2nov />,
    template3: <Template3 />,
  };
  const selectedTemplate = templates[resumeTemplate] || <Sb2nov />;

  // Function to download the resume as PDF
  const downloadResume = async () => {
    setLoading(true);
    const html = pdfRef.current.innerHTML;

    const res = await axios.post(
      "http://localhost:4000/api/generate-pdf",
      { html },
      {
        responseType: "blob",
      }
    );

    if(res.status !== 200) {
      alert("Failed to generate PDF");
      return;
    }
    setLoading(false);

    const url = URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "resume.pdf");
    document.body.appendChild(link);
    link.click();
  };
  // Check if JD is provided, if not redirect to JD page
  useEffect(() => {
    if (!resume) {
      alert("Create profile first");
      navigate("/resume");
    }
  }, []);

  return (
    <div className="bg-black min-h-screen">
    <div className="container mx-auto p-4 bg-black">
      <div className="shadow-lg" ref={pdfRef}>
        {selectedTemplate}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={downloadResume}
          className="bg-white text-black font-bold px-3 py-2 rounded w-xl hover:bg-gray-200 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading? "Loading..." : "Download Resume"}
        </button>
      </div>
    </div>
    </div>
  );
}
