import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResumeForm() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [expForm, setExpForm] = useState([
    { company: "", role: "", duration: "" },
  ]);
  const [educationFields, setEducationFields] = useState([
    { degree: "", institution: "", year: "", cgpa: "" },
  ]);
  const [projects, setProjects] = useState([
    {
      title: "",
      tech: "",
      description: "",
    },
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [objective, setObjective] = useState("");
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [referral, setReferral] = useState([]);
  const [publications, setPublications] = useState([]);
  const navigate = useNavigate();

  const handleAddLanguages = () => setLanguages([...languages, ""]);
  const handleLanguagesChange = (index, event) => {
    const updated = [...languages];
    updated[index] = event.target.value;
    setLanguages(updated);
  };

  const handleAddCertifications = () =>
    setCertifications([...certifications, ""]);
  const handleCertificationsChange = (index, event) => {
    const updated = [...certifications];
    updated[index] = event.target.value;
    setCertifications(updated);
  };

  const handleAddAchievements = () => setAchievements([...achievements, ""]);
  const handleAchievementsChange = (index, event) => {
    const updated = [...achievements];
    updated[index] = event.target.value;
    setAchievements(updated);
  };

  const handleAddReferrals = () => setReferral([...referral, ""]);
  const handleReferralChange = (index, event) => {
    const updated = [...referral];
    updated[index] = event.target.value;
    setReferral(updated);
  };

  const handleAddEducation = () =>
    setEducationFields([
      ...educationFields,
      { degree: "", institution: "", year: "", cgpa: "" },
    ]);
  const handleEducationChange = (index, event) => {
    const { name, value } = event.target;
    const updated = [...educationFields];
    updated[index][name] = value;
    setEducationFields(updated);
  };

  const handleAddExperience = () =>
    setExpForm([...expForm, { company: "", role: "", duration: "" }]);
  const handleExpChange = (index, event) => {
    const { name, value } = event.target;
    const updated = [...expForm];
    updated[index][name] = value;
    setExpForm(updated);
  };

  const handleAddProject = () =>
    setProjects([...projects, { title: "", tech: "", description: "" }]);
  const handleProjectChange = (index, event) => {
    const { name, value } = event.target;
    const updated = [...projects];
    updated[index][name] = value;
    setProjects(updated);
  };

  const handleAddSkills = () => setSkills([...skills, ""]);
  const handleSkillsChange = (index, event) => {
    const updated = [...skills];
    updated[index] = event.target.value;
    setSkills(updated);
  };

  const handleAddPublication = () => setPublications([...publications, ""]);
  const handlePublicationChange = (index, event) => {
    const updated = [...publications];
    updated[index] = event.target.value;
    setPublications(updated);
  };

  const handleSubmit = async () => {
    try {
      if (
        educationFields.length === 1 &&
        Object.values(educationFields[0]).every((v) => v === "")
      ) {
        setEducationFields([]);
      }

      if (
        expForm.length === 1 &&
        Object.values(expForm[0]).every((v) => v === "")
      ) {
        setExpForm([]);
      }

      if (
        projects.length === 1 &&
        Object.values(projects[0]).every((v) => v === "")
      ) {
        setProjects([]);
      }

      const resumeData = {
        name,
        email,
        address,
        objective,
        skills,
        education: educationFields,
        experience: expForm,
        projects,
        referral,
        certifications,
        achievements,
        publications,
        languages,
      };

      const res = await fetch(
        `http://localhost:4000/api/user/${userId}/create-resume`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(resumeData),
        }
      );

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-8 rounded-lg space-y-10 text-gray-200 shadow-lg">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-400">
        Resume Builder
      </h1>

      {/* Personal Information */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full md:col-span-2 px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
          />
        </div>
      </section>

      {/* Career Objective */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
          Career Objective
        </h2>
        <textarea
          placeholder="Your career objective..."
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
          required
        />
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-indigo-300">Skills</h2>
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <input
              key={index}
              type="text"
              value={skill}
              onChange={(e) => handleSkillsChange(index, e)}
              placeholder="Skill"
              className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
          <button
            type="button"
            onClick={handleAddSkills}
            className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            + Add Skill
          </button>
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
          Education
        </h2>
        <div className="space-y-6">
          {educationFields.map((field, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <input
                type="text"
                name="degree"
                value={field.degree}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="Degree"
                className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="institution"
                value={field.institution}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="Institution"
                className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="year"
                value={field.year}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="Year of Passing"
                className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="number"
                name="cgpa"
                value={field.cgpa}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="CGPA"
                className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddEducation}
            className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            + Add Education
          </button>
        </div>
      </section>

      {/* Experience */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
          Experience
        </h2>
        <div className="space-y-6">
          {expForm.map((field, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="text"
                name="company"
                value={field.company}
                onChange={(e) => handleExpChange(index, e)}
                placeholder="Company Name"
                className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="role"
                value={field.role}
                onChange={(e) => handleExpChange(index, e)}
                placeholder="Role"
                className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="duration"
                value={field.duration}
                onChange={(e) => handleExpChange(index, e)}
                placeholder="Duration"
                className="w-full md:col-span-3 px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddExperience}
            className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            + Add Experience
          </button>
        </div>
      </section>

      {/*Projects*/}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
          Projects
        </h2>
        <div className="space-y-6">
          {projects.map((field, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="text"
                name="title"
                value={field.title}
                onChange={(e) => handleProjectChange(index, e)}
                placeholder="Project Title"
                className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="tech"
                value={field.tech}
                onChange={(e) => handleProjectChange(index, e)}
                placeholder="Technologies Used"
                className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                name="description"
                value={field.description}
                onChange={(e) => handleProjectChange(index, e)}
                placeholder="Description"
                className="h-32 w-full md:col-span-3 px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddProject}
            className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            + Add Projects
          </button>
        </div>
      </section>

      {/* Referral */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
          Referral
        </h2>
        <div className="space-y-3">
          {referral.map((ref, index) => (
            <input
              key={index}
              type="text"
              value={ref}
              onChange={(e) => handleReferralChange(index, e)}
              placeholder="Referral Name"
              className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
          <button
            onClick={handleAddReferrals}
            className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            + Add Referral
          </button>
        </div>
      </section>

      {/* Certifications */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
          Certifications
        </h2>
        <div className="space-y-3">
          {certifications.map((cert, index) => (
            <input
              key={index}
              value={certifications[index]}
              placeholder="Certification Name"
              type="text"
              onChange={(e) => handleCertificationsChange(index, e)}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 file:bg-indigo-600 file:text-white file:px-3 file:py-1 file:rounded file:border-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
          <button
            onClick={handleAddCertifications}
            className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            + Add Certification
          </button>
        </div>
      </section>

      {/* Achievements */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
          Achievements
        </h2>
        <div className="space-y-3">
          {achievements.map((ach, index) => (
            <input
              key={index}
              type="text"
              value={achievements[index]}
              placeholder="Achievement"
              onChange={(e) => handleAchievementsChange(index, e)}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 file:bg-indigo-600 file:text-white file:px-3 file:py-1 file:rounded file:border-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
          <button
            onClick={handleAddAchievements}
            className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            + Add Achievement
          </button>
        </div>
      </section>

      {/*Publications*/}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
          Publications
        </h2>
        <div className="space-y-3">
          {publications.map((ach, index) => (
            <input
              key={index}
              type="text"
              value={publications[index]}
              placeholder="Publication"
              onChange={(e) => handlePublicationChange(index, e)}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 file:bg-indigo-600 file:text-white file:px-3 file:py-1 file:rounded file:border-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
          <button
            onClick={handleAddPublication}
            className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            + Add Publication
          </button>
        </div>
      </section>

      {/* Languages */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
          Languages
        </h2>
        <div className="space-y-3">
          {languages.map((lang, index) => (
            <input
              key={index}
              type="text"
              value={lang}
              onChange={(e) => handleLanguagesChange(index, e)}
              placeholder="Language"
              className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
          <button
            onClick={handleAddLanguages}
            className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            + Add Language
          </button>
        </div>
      </section>

      <button
        onClick={handleSubmit}
        className="w-full mt-10 px-6 py-4 bg-indigo-700 text-white font-semibold rounded-md hover:bg-indigo-800 transition"
      >
        Submit
      </button>
    </div>
  );
}
