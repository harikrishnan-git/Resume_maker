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
    <div className="bg-gradient-to-b from-black to-gray-900 text-gray-700 min-h-screen py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-white">Welcome, {username}</h1>

      <div className="text-center mb-8 max-w-2xl">
      <p className="font-bold text-xl text-gray-300">Craft a stand out resume that showcases your skills and helps you land your dream job !</p>
      </div>
      <Link
        to="/resume"
        className="mb-8 px-6 py-3 border-1 border-white hover:bg-gray-700 text-white rounded-md font-bold"
      >
        + Create New Profile
      </Link>
      

      {resumes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-gray-300 p-6 rounded-lg shadow hover:border-1 borser-white transition w-full"
            >
              <h2 className="text-center text-2xl text-black font-bold mb-2">
                {resume.type}
              </h2>

              <p className="mb-1">
                <span className="text-black font-semibold">Name:</span> {resume.name}
              </p>
              <p className="mb-1">
                <span className="text-black font-semibold">Email:</span> {resume.email}
              </p>
              <p className="mb-1">
                <span className="text-black font-semibold">Address:</span> {resume.address}
              </p>
              <p className="mb-3">
                <span className="text-black font-semibold">Career Objective:</span>{" "}
                {resume.careerObjective}
              </p>

              {resume.skills.length > 0 && (
                <div className="mb-3">
                  <span className="text-black font-semibold">Skills:</span>
                  <ul className="list-disc ml-5">
                    {resume.skills?.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}

              {resume.education.length > 0 && (
                <div className="mb-3">
                  <span className="text-black font-semibold">Education:</span>
                  <ul className="list-disc ml-5 ">
                    {resume.education?.map((edu, index) => (
                      <li key={index}>
                        <p>
                          <span className="text-gray-700 font-semibold">
                            {edu.degree}
                          </span>{" "}
                          — {edu.institution}
                        </p>
                        <p className="text-sm ">
                          Year: {edu.year} | CGPA: {edu.cgpa}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {resume.experience?.length > 0 && (
                <div className="mb-3">
                  <span className="text-black font-semibold">Experience:</span>
                  <ul className="list-disc ml-5">
                    {resume.experience?.map((exp, index) => (
                      <li key={index}>
                        <p className="font-semibold text-gray-700">
                          {exp.role}
                        </p>
                        <p className="text-sm">{exp.company}</p>
                        <p className="text-sm">
                          Duration: {exp.duration}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {resume.projects?.length > 0 && (
                <div className="mb-3">
                  <span className="text-black font-semibold">Projects:</span>
                  <ul className="list-disc ml-5">
                    {resume.projects?.map((exp, index) => (
                      <li key={index}>
                        <p className="font-semibold text-gray-700">
                          {exp.title}
                        </p>
                        <p className="text-sm ">{exp.tech}</p>
                        <p className="text-sm ">
                          Description: {exp.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {resume.referral.length > 0 && (
                <p className="mb-1">
                  <span className="text-black font-semibold">Referral:</span>{" "}
                  {resume.referral}
                </p>
              )}

              {resume.certifications.length > 0 && (
                <div className="mb-3">
                  <span className="text-black font-semibold">Certifications:</span>
                  <ul className="list-disc ml-5">
                    {resume.certifications?.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                </div>
              )}

              {resume.achievements.length > 0 && (
                <div className="mb-3">
                  <span className="text-black font-semibold">Achievements:</span>
                  <ul className="list-disc ml-5 ">
                    {resume.achievements?.map((ach, index) => (
                      <li key={index}>{ach}</li>
                    ))}
                  </ul>
                </div>
              )}

              {resume.publications.length > 0 && (
                <div className="mb-3">
                  <span className="text-black font-semibold">Publications:</span>
                  <ul className="list-disc ml-5 ">
                    {resume.publications?.map((ach, index) => (
                      <li key={index}>{ach}</li>
                    ))}
                  </ul>
                </div>
              )}

              {resume.languages.length > 0 && (
                <div className="mb-3">
                  <span className="text-black font-semibold">Languages:</span>
                  <ul className="list-disc ml-5 ">
                    {resume.languages?.map((lang, index) => (
                      <li key={index}>{lang}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                to={`/resume/${resume._id}`}
                state={{ resume }} // ✅ Pass full resume if needed
                className="inline-block px-4 py-2 mt-4 bg-black text-white rounded-md hover:bg-gray-700 transition"
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
