import React from "react";

const NewTemp = () => {
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
    referral = [],
  } = resume["optimizedResume"];

  return (
    <main className="bg-gray-100 text-gray-800 font-sans">
      <div className="max-w-4xl mx-auto my-8 bg-white p-10 rounded-lg shadow-lg">
        {/* Header */}
        <header className="border-b-2 pb-4 mb-6">
          <h1 className="text-4xl font-bold">{name}</h1>
          <p className="text-lg text-gray-600">
            {email} {address && `| ${address}`}
          </p>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              Summary
            </h2>
            <p>{summary}</p>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Skills</h2>
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <li key={i} className="bg-gray-200 text-sm px-3 py-1 rounded">
                  {skill}
                </li>
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
              <div key={i} className="mb-4">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-sm text-gray-600">
                  {edu.institution} | {edu.year}
                </p>
                {edu.cgpa && <p className="text-sm">CGPA: {edu.cgpa}</p>}
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
              <div key={i} className="mb-4">
                <h3 className="font-semibold">{exp.role}</h3>
                <p className="text-sm text-gray-600">
                  {exp.company} | {exp.duration}
                </p>
                {exp.description && (
                  <ul className="list-disc list-inside mt-1 text-sm">
                    {exp.description.map((line, j) => (
                      <li key={j}>{line}</li>
                    ))}
                  </ul>
                )}
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
                <h3 className="font-semibold">{project.title}</h3>
                {project.tech && (
                  <p className="italic text-sm text-gray-600">
                    Tech Used: {project.tech}
                  </p>
                )}
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

        {referral.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              Referrals
            </h2>
            <ul className="list-disc list-inside">
              {referral.map((ref, i) => (
                <li key={i}>{ref}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
};

export default NewTemp;
