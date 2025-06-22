import React from "react";

const ResumeTemplate = () => {
  const resume = JSON.parse(localStorage.getItem("resume"));
  if (!resume)
    return <div className="text-center text-gray-500">Loading...</div>;

  const {
    name,
    email,
    address,
    summary,
    skills = [],
    education = [],
    experience = [],
    projects = [],
    certifications = [],
    achievements = [],
    publications = [],
    languages = [],
  } = resume["optimizedResume"];

  return (
    <div className="bg-gradient-to-tr from-blue-50 to-indigo-100 min-h-screen py-10 px-4 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10 space-y-8">
        {/* Header */}
        <header className="text-center border-b pb-6">
          <h1 className="text-4xl font-extrabold text-indigo-800">{name}</h1>
          <p className="text-lg text-gray-600 mt-2">{email}</p>
          {address && <p className="text-sm text-gray-500">{address}</p>}
        </header>

        {/* Section Reusable Component */}
        {summary && (
          <Section title="Career Objective">
            <p className="text-justify">{summary}</p>
          </Section>
        )}

        {skills.length > 0 && (
          <Section title="Skills">
            <ul className="list-disc list-inside grid grid-cols-2 gap-x-6 gap-y-1">
              {skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education">
            {education.map((edu, i) => (
              <div key={i} className="mb-3">
                <h3 className="text-lg font-semibold text-indigo-700">
                  {edu.degree}
                </h3>
                <p className="text-sm text-gray-700">
                  {edu.institution}, {edu.year}
                </p>
                <p className="text-sm text-gray-600">CGPA: {edu.cgpa}</p>
              </div>
            ))}
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Experience">
            {experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <h3 className="text-lg font-semibold text-indigo-700">
                  {exp.role}
                </h3>
                <p className="text-sm text-gray-700">
                  {exp.company} | {exp.duration}
                </p>
              </div>
            ))}
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="Projects">
            {projects.map((project, i) => (
              <div key={i} className="mb-4">
                <h3 className="text-lg font-semibold text-indigo-700">
                  {project.title}
                </h3>
                <p className="text-sm italic text-gray-600">
                  Tech Used: {project.tech}
                </p>
                <p className="text-sm">{project.description}</p>
              </div>
            ))}
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title="Certifications">
            <ul className="list-disc list-inside space-y-1">
              {certifications.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </Section>
        )}

        {achievements.length > 0 && (
          <Section title="Achievements">
            <ul className="list-disc list-inside space-y-1">
              {achievements.map((achieve, i) => (
                <li key={i}>{achieve}</li>
              ))}
            </ul>
          </Section>
        )}

        {publications.length > 0 && (
          <Section title="Publications">
            <ul className="list-disc list-inside space-y-1">
              {publications.map((pub, i) => (
                <li key={i}>{pub}</li>
              ))}
            </ul>
          </Section>
        )}

        {languages.length > 0 && (
          <Section title="Languages">
            <ul className="list-disc list-inside space-y-1">
              {languages.map((lang, i) => (
                <li key={i}>{lang}</li>
              ))}
            </ul>
          </Section>
        )}
      </div>
    </div>
  );
};

// 🔁 Reusable Section Component
const Section = ({ title, children }) => (
  <section className="p-5 bg-indigo-50 rounded-xl shadow-inner border border-indigo-100">
    <h2 className="text-xl font-bold text-indigo-800 mb-3 border-b border-indigo-300 pb-1">
      {title}
    </h2>
    {children}
  </section>
);

export default ResumeTemplate;
