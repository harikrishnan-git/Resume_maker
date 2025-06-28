
import { set } from "mongoose";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Jd() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("Sb2nov");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeTypes, setResumeTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [lackingSkills, setLackingSkills] = useState("");

  useEffect(() => {
    const getResumeTypes = async () => {
      setLoading(true);
      try {
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
            const skillRes = await fetch(`http://localhost:4000/api/user/${userId}/lacking-skills`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                jd: jobDescription,
                resumeSkills,
              }),
            });

            const skillData = await skillRes.json();
            if (skillRes.ok) {
              localStorage.setItem("lackingSkills", skillData.lackingSkills);
              setLackingSkills(skillData.lackingSkills);
              const cleanLackingSkillsArray = skillData.lackingSkills
              .split(",")
              .map(skill => skill.trim())
              .filter(skill => skill.length > 0);
              localStorage.setItem("OptimisationPercentage",resumeSkills.length? (resumeSkills.length/(resumeSkills.length+cleanLackingSkillsArray.length))*100:0);
              console.log("Lacking skills:", skillData.lackingSkills);
              console.log("Optimisation Percentage:", localStorage.getItem("OptimisationPercentage"));
            } else {
              console.error("Error getting lacking skills:", skillData.error);
            }
          } catch (err) {
            console.error("Failed to fetch lacking skills:", err);
          }

        navigate("/view-resume");
      } catch (error) {
        alert("Error submitting job description. Please try again.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a job description and select resume type.");
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
            <div className="flex flex-col">
              <label
                htmlFor="template"
                className="text-white mb-2 font-medium"
              >
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
        </div>
      )}
    </div>
  );
}
