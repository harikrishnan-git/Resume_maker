import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const userId = localStorage.getItem("userId");
  const [username, setUserName] = useState("");
  const [resumes, setResumes] = useState([]);
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/user/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUserName(data.name);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    const fetchResumes = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/user/${userId}/resume`
        );
        const data = await res.json();
        if (res.ok) {
          setResumes(data);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error("Failed to fetch resumes:", err);
      }
    };

    if (userId) {
      fetchUserName();
      fetchResumes();
    }
  }, [userId]);
  return (
    <div className="bg-black text-gray-300 min-h-screen py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-white">Dashboard</h1>
      <p className="text-lg mb-6">
        Hello, <span className="font-semibold text-indigo-400">{username}</span>
      </p>

      <Link
        to="/resume"
        className="mb-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-bold"
      >
        + Create New Resume
      </Link>

      {resumes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {resume.name}
              </h2>

              <p className="mb-1">
                <span className="text-gray-400">Email:</span> {resume.email}
              </p>
              <p className="mb-1">
                <span className="text-gray-400">Address:</span> {resume.address}
              </p>
              <p className="mb-3">
                <span className="text-gray-400">Career Objective:</span>{" "}
                {resume.careerObjective}
              </p>

              <div className="mb-3">
                <span className="text-gray-400">Skills:</span>
                <ul className="list-disc ml-5 text-white">
                  {resume.skills?.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <span className="text-gray-400">Education:</span>
                <ul className="list-disc ml-5 text-white">
                  {resume.education?.map((edu, index) => (
                    <li key={index}>
                      <p>
                        <span className="text-indigo-400 font-semibold">
                          {edu.degree}
                        </span>{" "}
                        — {edu.institution}
                      </p>
                      <p className="text-sm text-gray-300">
                        Year: {edu.year} | CGPA: {edu.cgpa}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {resume.experience?.length > 0 && (
                <div className="mb-3">
                  <span className="text-gray-400">Experience:</span>
                  <ul className="list-disc ml-5 text-white">
                    {resume.experience?.map((exp, index) => (
                      <li key={index}>
                        <p className="font-semibold text-indigo-400">
                          {exp.role}
                        </p>
                        <p className="text-sm text-white">{exp.company}</p>
                        <p className="text-sm text-gray-300">
                          Duration: {exp.duration}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="mb-1">
                <span className="text-gray-400">Referral:</span>{" "}
                {resume.referral}
              </p>
              <div className="mb-3">
                <span className="text-gray-400">Certifications:</span>
                <ul className="list-disc ml-5 text-white">
                  {resume.certifications?.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <span className="text-gray-400">Achievements:</span>
                <ul className="list-disc ml-5 text-white">
                  {resume.achievements?.map((ach, index) => (
                    <li key={index}>{ach}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <span className="text-gray-400">Languages:</span>
                <ul className="list-disc ml-5 text-white">
                  {resume.languages?.map((lang, index) => (
                    <li key={index}>{lang}</li>
                  ))}
                </ul>
              </div>

              <Link
                to={`/resume/${resume._id}`}
                state={{ resume }} // ✅ Pass full resume if needed
                className="inline-block px-4 py-2 mt-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
              >
                View Resume
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No resumes found. Create one!
        </p>
      )}
    </div>
  );
}
