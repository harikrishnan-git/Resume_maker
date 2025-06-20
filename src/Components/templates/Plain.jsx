import React from "react";

const ResumeTemplate = () => {
  const resume = JSON.parse(localStorage.getItem("resume"));
  if (!resume)
    return <div className="text-center text-gray-500">Loading...</div>;

  const {
    name,
    email,
    address,
    careerObjective,
    skills = [],
    education = [],
    experience = [],
    projects = [],
    certifications = [],
    achievements = [],
    publications = [],
    languages = [],
  } = resume[0]; //Why is resume an array? Assuming it's always an array with one object.

  return (
    <div className="bg-gray-100 text-gray-800 font-sans leading-relaxed p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-10 my-10">
        {/* Header */}
        <header className="border-b pb-4 mb-6">
          <h1 className="text-4xl font-bold">{name}</h1>
          <p className="text-lg text-gray-600">
            {email} {address && `| ${address}`}
          </p>
        </header>

        {/* Career Objective */}
        {careerObjective && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              Career Objective
            </h2>
            <p>{careerObjective}</p>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Skills</h2>
            <ul className="list-disc list-inside grid grid-cols-2 gap-2">
              {skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              Education
            </h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-3">
                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                <p className="text-sm text-gray-700">
                  {edu.institution}, {edu.year}
                </p>
                <p className="text-sm text-gray-600">CGPA: {edu.cgpa}</p>
              </div>
            ))}
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              Experience
            </h2>
            {experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <h3 className="text-lg font-semibold">{exp.role}</h3>
                <p className="text-sm text-gray-700">
                  {exp.company} | {exp.duration}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              Projects
            </h2>
            {projects.map((project, i) => (
              <div key={i} className="mb-4">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-sm italic text-gray-600">
                  Tech Used: {project.tech}
                </p>
                <p className="text-sm">{project.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              Certifications
            </h2>
            <ul className="list-disc list-inside">
              {certifications.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              Achievements
            </h2>
            <ul className="list-disc list-inside">
              {achievements.map((achieve, i) => (
                <li key={i}>{achieve}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Publications */}
        {publications.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              Publications
            </h2>
            <ul className="list-disc list-inside">
              {publications.map((pub, i) => (
                <li key={i}>{pub}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              Languages
            </h2>
            <ul className="list-disc list-inside">
              {languages.map((lang, i) => (
                <li key={i}>{lang}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumeTemplate;
