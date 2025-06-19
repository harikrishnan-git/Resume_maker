import { useState } from "react";

export default function Jd() {
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = async () => {
    if (jobDescription.trim()) {
      try {
        const res = await fetch("http://localhost:4000/api/jd", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: jobDescription }),
        });
        alert("Job description submitted!");
      } catch (error) {
        alert("Error submitting job description. Please try again.");
        console.error("Error:", error);
      }
    } else {
      alert("Please enter a job description.");
    }
  };
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-gray-200 min-h-screen py-16 px-6 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-center mb-4">
        Job Description
      </h1>
      <p className="text-lg text-gray-400 text-center max-w-xl mb-8">
        Tailor your resume to match the job description perfectly. Paste the job
        description below.
      </p>

      <textarea
        className="w-full max-w-3xl h-64 p-5 border border-gray-600 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition duration-200"
        placeholder="Paste the job description here..."
        resize="none"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        style={{ fontFamily: "monospace", fontSize: "16px" }}
        autoFocus
      />

      <button
        className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
