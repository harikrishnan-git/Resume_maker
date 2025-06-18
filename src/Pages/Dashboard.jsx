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

              <Link
                to={`/resume/${resume._id}`}
                className="inline-block px-4 py-2 mt-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
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
