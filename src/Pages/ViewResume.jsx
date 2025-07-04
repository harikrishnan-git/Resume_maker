import { useEffect, useState, useRef } from "react";
import Plain from "../Components/templates/Plain";
import Sb2nov from "../Components/templates/Sb2nov";
import Template3 from "../Components/templates/Template3";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LackingSkills from "../Components/LackingSkills";
import { toast } from "react-hot-toast";

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
    console.log("HTML content for PDF:", html);

    /*const res = await axios.post(
      "/api/generate-pdf",
      { html },
      {
        responseType: "blob",
      }
    );*/
    const res = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html }),
    });

    if (res.status !== 200) {
      toast.error("Failed to generate PDF");
      return;
    }
    const pdfBlob = await res.blob();
    const formData = new FormData();

    formData.append(
      "resumePdf",
      new Blob([pdfBlob], { type: "application/pdf" })
    );
    formData.append("userId", localStorage.getItem("userId"));
    formData.append("companyName", localStorage.getItem("companyName"));
    formData.append("jobDescription", localStorage.getItem("jobDescription"));

    // Step 3: Upload PDF with metadata to MongoDB
    try {
      const uploadRes = await axios.post("/api/save-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (uploadRes.status === 200) {
        console.log("Resume saved successfully to DB");
      } else {
        console.error("Failed to save resume in DB");
      }
    } catch (err) {
      console.error("Error uploading resume", err);
    }

    setLoading(false);

    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "resume.pdf");
    document.body.appendChild(link);
    link.click();
  };

  // Check if JD is provided, if not redirect to JD page
  useEffect(() => {
    if (!resume) {
      toast.error("Create profile first");
      navigate("/resume");
    }
  }, []);

  return (
    <div className="lg:flex flex-column gap-10 bg-black min-h-screen w-screen text-white justify-center ">
      <div className="px-10 py-10 bg-black shadow-lg">
        <div ref={pdfRef}>{selectedTemplate}</div>
        <div className="flex justify-center mt-6">
          <button
            onClick={downloadResume}
            className="bg-white text-black font-bold px-3 py-2 rounded w-xl hover:bg-gray-200 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Download Resume"}
          </button>
        </div>
      </div>
      <div className="py-10 px-10 mx-auto w-1/2">
        <LackingSkills />
      </div>
    </div>
  );
}
