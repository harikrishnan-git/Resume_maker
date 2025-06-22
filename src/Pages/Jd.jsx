import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Jd() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeTypes, setResumeTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const getResumeTypes = async () => {
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
      }
    };

    getResumeTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (jobDescription.trim() && selectedType !== "") {
      try {
        const res = await fetch(
          `http://localhost:4000/api/user/${userId}/optimize-resume`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              description: jobDescription,
              type: selectedType,
            }),
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Failed to submit job description");
        }
        localStorage.setItem("resume", JSON.stringify(data));
        navigate("/view-resume");
      } catch (error) {
        alert("Error submitting job description. Please try again.");
        console.error("Error:", error);
      }
    } else {
      alert("Please enter a job description and select resume type.");
    }
  };
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-gray-200 min-h-screen py-16 px-6 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-center mb-4">
        Job Description
      </h1>
      <p className="text-lg text-gray-400 text-center max-w-2xl mb-10">
        Tailor your resume to match the job description perfectly. Paste the job
        description and select the resume type below.
      </p>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full max-w-3xl space-y-6 bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700"
      >
        <div className="flex flex-col">
          <label
            htmlFor="jobDescription"
            className="text-gray-300 mb-2 font-medium"
          >
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="jobDescription"
            className="w-full h-64 p-5 border border-gray-600 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            style={{ fontFamily: "monospace", fontSize: "16px" }}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="type" className="text-gray-300 mb-2 font-medium">
            Resume Type <span className="text-red-500">*</span>
          </label>
          <select
            id="type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="p-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          >
            {resumeTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
