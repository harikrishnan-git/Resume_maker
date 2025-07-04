import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useRef } from "react";
import template1 from "../assets/template1.jpeg";
import template2 from "../assets/template2.jpeg";
import template3 from "../assets/template3.jpeg";

export default function Jd() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeTypes, setResumeTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [lackingSkills, setLackingSkills] = useState("");

  const templateScrollRef = useRef(null);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [previewImage, setPreviewImage] = useState(0);
  const [templatePage, setTemplatePage] = useState(0);
  const templatesPerPage = 3;
  const templates = [
    { id: "template1", name: "Template 1", image: template1 },
    { id: "template2", name: "Template 2", image: template2 },
    { id: "template3", name: "Template 3", image: template3 },
  ];
  const currentTemplates = templates.slice(
    templatePage * templatesPerPage,
    (templatePage + 1) * templatesPerPage
  );

  const scrollTemplates = (direction) => {
    const scrollAmount = 200;
    if (templateScrollRef.current) {
      if (direction === "left") {
        templateScrollRef.current.scrollLeft -= scrollAmount;
      } else {
        templateScrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };
  useEffect(() => {
    const getResumeTypes = async () => {
      setLoading(true);
      try {
        if (!userId) {
          toast.error("User ID not found. Please log in.");
          navigate("/login");
          return;
        }
        const res = await fetch(
          `http://localhost:4000/api/user/${userId}/resume`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        const updated = data.map((item) => item.type);
        setResumeTypes(updated);
      } catch (error) {
        console.error("Error fetching resume types:", error);
        toast.error("Failed to fetch resume types. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getResumeTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (companyName && jobDescription.trim() && selectedType !== "") {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:4000/api/user/${userId}/optimize-resume`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jd: jobDescription,
              type: selectedType,
            }),
          }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error("Failed to submit job description");
        }
        localStorage.setItem("resume", JSON.stringify(data));
        localStorage.setItem(
          "resumeTemplate",
          JSON.stringify(selectedTemplate)
        );
        localStorage.setItem("companyName", companyName);
        localStorage.setItem("jobDescription", jobDescription);

        //fetch lacking skills
        const resumeSkills = data.optimizedResume.skills || [];
        console.log("Resume skills:", resumeSkills);
        try {
          const skillRes = await fetch(
            `http://localhost:4000/api/user/${userId}/lacking-skills`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                jd: jobDescription,
                resumeSkills,
              }),
            }
          );

          const skillData = await skillRes.json();
          if (skillRes.ok) {
            localStorage.setItem("lackingSkills", skillData.lackingSkills);
            setLackingSkills(skillData.lackingSkills);
            const cleanLackingSkillsArray = skillData.lackingSkills
              .split(",")
              .map((skill) => skill.trim())
              .filter((skill) => skill.length > 0);
            localStorage.setItem(
              "OptimisationPercentage",
              resumeSkills.length
                ? (resumeSkills.length /
                    (resumeSkills.length + cleanLackingSkillsArray.length)) *
                    100
                : 0
            );
            console.log("Lacking skills:", skillData.lackingSkills);
            console.log(
              "Optimisation Percentage:",
              localStorage.getItem("OptimisationPercentage")
            );
          } else {
            console.error("Error getting lacking skills:", skillData.error);
          }
        } catch (err) {
          console.error("Failed to fetch lacking skills:", err);
        }

        navigate("/view-resume");
      } catch (error) {
        toast.error("Error submitting job description. Please try again.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please enter a job description and select resume type.");
    }
  };
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-gray-200 min-h-screen py-16 px-6 flex flex-col items-center">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          {/* Spinner */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-md"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          </div>

          {/* Text */}
          <h2 className="text-lg font-semibold text-blue-500 mt-6">
            Loading...
          </h2>
        </div>
      ) : (
        <div>
          <h1 className="text-5xl font-extrabold text-center mb-4">
            Job Description
          </h1>
          <p className="text-lg text-gray-400 text-center max-w-2xl mb-10">
            Tailor your resume to match the job description perfectly. Paste the
            job description and select the resume type below.
          </p>

          <form
            onSubmit={(e) => handleSubmit(e)}
            className="w-full max-w-3xl space-y-6 bg-zinc-900 bg-opacity-40 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-zinc-600"
          >
            <div className="flex flex-col">
              <label
                htmlFor="companyName"
                className="text-white mb-2 font-medium"
              >
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                id="companyName"
                className="w-full mb-6 p-5 border border-gray-600 rounded-xl bg-zinc-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-200 "
                placeholder="Enter the company name here..."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                autoFocus
                style={{ fontFamily: "monospace", fontSize: "16px" }}
              />

              <label
                htmlFor="jobDescription"
                className="text-white mb-2 font-medium"
              >
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="jobDescription"
                className="w-full h-64 p-5 border border-gray-600 rounded-xl bg-zinc-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-200 "
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
                autoFocus
                style={{ fontFamily: "monospace", fontSize: "16px" }}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="type" className="text-white mb-2 font-medium">
                Resume Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="p-3 border border-gray-600 rounded-lg bg-zinc-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-white transition duration-200"
                required
              >
                {resumeTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Resume Template */}
            {/*
            <div className="flex flex-col">
              <label htmlFor="template" className="text-white mb-2 font-medium">
                Resume Template <span className="text-red-500">*</span>
              </label>
              <select
                id="template"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="p-3 border border-gray-600 rounded-lg bg-zinc-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-white transition duration-200"
                required
              >
                <option value="sb2nov">SB2Nov</option>
                <option value="plain">Plain</option>
                <option value="template3">Template3</option>
              </select>
            </div>
          */}

            <div className="flex flex-col relative mt-4">
              <label className="text-white mb-4 font-medium">
                Resume Template <span className="text-red-500">*</span>
              </label>

              <div className="relative w-full">
                {/* Left Arrow */}
                <button
                  onClick={() => scrollTemplates("left")}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 rounded-full"
                >
                  <span className="text-white text-2xl">&#8592;</span>
                </button>

                {/* Scrollable Template Container */}
                <div
                  ref={templateScrollRef}
                  className="flex overflow-x-auto gap-4 scrollbar-hide px-10"
                  style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
                >
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="relative flex-shrink-0 w-40"
                      onMouseEnter={() => setHoveredTemplate(template.id)}
                      onMouseLeave={() => setHoveredTemplate(null)}
                    >
                      <div
                        className={`group cursor-pointer rounded-lg overflow-hidden border-2 ${
                          selectedTemplate === template.id
                            ? "border-blue-500 ring-4 ring-blue-500"
                            : "border-zinc-700"
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <img
                          src={template.image}
                          alt={template.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-center text-sm py-1 text-white">
                          {template.name}
                        </div>
                      </div>
                    </div>
                  ))}
                  {hoveredTemplate && (
                    <div
                      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                      onMouseLeave={() => setHoveredTemplate(null)}
                    >
                      <div className="bg-white rounded-xl p-2 shadow-2xl border border-zinc-400">
                        <img
                          src={
                            templates.find((t) => t.id === hoveredTemplate)
                              .image
                          }
                          alt="Preview"
                          className="w-96 h-auto rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={() => scrollTemplates("right")}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 rounded-full"
                >
                  <span className="text-white text-2xl">&#8594;</span>
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-white hover:bg-gray-300 text-black rounded-lg font-bold transition duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
              >
                Submit
              </button>
            </div>
          </form>
          {previewImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              onClick={() => setPreviewImage(null)}
            >
              <img
                src={previewImage}
                alt="Enlarged Template Preview"
                className="w-1/2 h-auto rounded-xl border-4 border-white shadow-xl transition-transform duration-300"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
