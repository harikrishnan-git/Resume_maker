import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserHistory from "../Components/UserHistory";
import toast from "react-hot-toast";
import bin from "../assets/bin.png";

export default function Dashboard() {
  const userId = localStorage.getItem("userId");
  const [username, setUserName] = useState("");
  const [resumes, setResumes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  const navigate = useNavigate();
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
        const res = await fetch(`/api/user/${userId}/resume`);
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
    } else {
      toast.error(
        "You are not logged in. Please log in to access your dashboard."
      );
      navigate("/login");
    }
  }, [userId]);

  const handleDelete = async (resumeId) => {
    try {
      const response = await fetch(`/api/resume/${resumeId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error("Failed to delete resume");
        throw new Error("Failed to delete resume");
      }
      toast.success("Resume deleted successfully");
      setResumes((prevResumes) =>
        prevResumes.filter((resume) => resume._id !== resumeId)
      );
    } catch (err) {
      toast.error("Failed to delete resume");
    }
  };

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-gray-700 min-h-screen py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-white">
        Welcome, {isAuthenticated ? username : "User"}
      </h1>

      <div className="text-center mb-8 max-w-2xl">
        <p className="font-bold text-xl text-gray-300">
          Craft a stand out resume that showcases your skills and helps you land
          your dream job !
        </p>
      </div>
      <Link
        to="/resume"
        className="mb-8 px-6 py-3 border-1 border-white hover:bg-gray-700 text-white rounded-md font-bold"
      >
        + Create New Profile
      </Link>
      <div className="w-full max-w-[1240px] mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">
          {isAuthenticated ? "My Resumes" : ""}
        </h2>
        <UserHistory />
      </div>

      <div className="w-full max-w-[1240px]">
        <h2 className="text-2xl font-bold mb-4 text-white">
          {resumes.length > 0 ? "My Profiles" : ""}
        </h2>
        {resumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="relative max-h-[300px]  overflow-hidden text-gray-300 bg-zinc-900 bg-opacity-40 backdrop-blur-md border border-zinc-600 p-6 rounded shadow-xl hover:border-1 borser-zinc-600 transition w-full"
              >
                <div className="overflow-hidden ">
                  <div className="flex">
                    <h2 className="text-center text-2xl text-white font-bold mb-2">
                      {resume.type}
                    </h2>
                    <div className="rounded ml-auto flex w-[30px] h-[30px] justify-center items-center hover:bg-zinc-800 ">
                      <button
                        className="w-[20px] h-[20px]"
                        onClick={() => handleDelete(resume._id)}
                      >
                        <img src={bin} alt="delete" width={30} height={30} />
                      </button>
                    </div>
                  </div>

                  <p className="mb-1">
                    <span className="text-white font-semibold">Name:</span>{" "}
                    {resume.name}
                  </p>
                  <p className="mb-1">
                    <span className="text-white font-semibold">Email:</span>{" "}
                    {resume.email}
                  </p>
                  <p className="mb-1">
                    <span className="text-white font-semibold">Address:</span>{" "}
                    {resume.address}
                  </p>
                  <p className="mb-3">
                    <span className="text-white font-semibold">
                      Career Objective:
                    </span>{" "}
                    {resume.careerObjective}
                  </p>

                  {resume.skills.length > 0 && (
                    <div className="mb-3">
                      <span className="text-white font-semibold">Skills:</span>
                      <ul className="list-disc ml-5">
                        {resume.skills?.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resume.education.length > 0 && (
                    <div className="mb-3">
                      <span className="text-white font-semibold">
                        Education:
                      </span>
                      <ul className="list-disc ml-5 ">
                        {resume.education?.map((edu, index) => (
                          <li key={index}>
                            <p>
                              <span className="font-semibold">
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
                      <span className="text-white font-semibold">
                        Experience:
                      </span>
                      <ul className="list-disc ml-5">
                        {resume.experience?.map((exp, index) => (
                          <li key={index}>
                            <p className="font-semibold ">{exp.role}</p>
                            <p className="text-sm">{exp.company}</p>
                            <p className="text-sm">Duration: {exp.duration}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resume.projects?.length > 0 && (
                    <div className="mb-3">
                      <span className="text-white font-semibold">
                        Projects:
                      </span>
                      <ul className="list-disc ml-5">
                        {resume.projects?.map((exp, index) => (
                          <li key={index}>
                            <p className="font-semibold">{exp.title}</p>
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
                      <span className="text-white font-semibold">
                        Referral:
                      </span>{" "}
                      {resume.referral}
                    </p>
                  )}

                  {resume.certifications.length > 0 && (
                    <div className="mb-3">
                      <span className="text-white font-semibold">
                        Certifications:
                      </span>
                      <ul className="list-disc ml-5">
                        {resume.certifications?.map((cert, index) => (
                          <li key={index}>{cert}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resume.achievements.length > 0 && (
                    <div className="mb-3">
                      <span className="text-white font-semibold">
                        Achievements:
                      </span>
                      <ul className="list-disc ml-5 ">
                        {resume.achievements?.map((ach, index) => (
                          <li key={index}>{ach}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resume.publications.length > 0 && (
                    <div className="mb-3">
                      <span className="text-white font-semibold">
                        Publications:
                      </span>
                      <ul className="list-disc ml-5 ">
                        {resume.publications?.map((ach, index) => (
                          <li key={index}>{ach}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resume.languages.length > 0 && (
                    <div className="mb-3">
                      <span className="text-white font-semibold">
                        Languages:
                      </span>
                      <ul className="list-disc ml-5 ">
                        {resume.languages?.map((lang, index) => (
                          <li key={index}>{lang}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none"></div>
                </div>

                <Link
                  to={`/resume/${resume._id}`}
                  state={{ resume }} // ✅ Pass full resume if needed
                  className="absolute bottom-4 right-4 text-center w-[100px] px-4 py-2  bg-white text-black font-bold rounded-md hover:bg-gray-300 transition"
                >
                  View
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
    </div>
  );
}
