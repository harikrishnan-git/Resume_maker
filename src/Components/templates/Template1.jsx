import EditField from "../EditField";
import { Mail, MapPin, Phone } from "lucide-react";

const NewTemplate1 = () => {
  const resume = JSON.parse(localStorage.getItem("resume"));
  if (!resume)
    return <div className="text-center text-gray-500">Loading...</div>;

  const {
    name,
    email,
    address,
    phone,
    summary,
    skills = [],
    education = [],
    experience = [],
    languages = [],
    projects = [],
    certifications = [],
    achievements = [],
    publications = [],
    referral = [],
  } = resume["optimizedResume"];

  return (
    <main className="bg-gray-200 font-sans py-10 px-2">
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4 bg-white shadow-lg">
        {/* Sidebar */}
        <aside className="bg-gray-100 p-6 col-span-1 space-y-6">
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-700" />
              <EditField value={email} />
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-700" />
              <EditField value={phone || "Your Phone"} />
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-700" />
              <EditField value={address} />
            </div>
          </div>

          <section>
            <h2 className="text-sm font-bold uppercase mb-2 text-gray-800">
              Education
            </h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-3">
                <p className="text-sm font-medium text-gray-800">
                  <EditField value={edu.degree} />
                </p>
                <p className="text-xs text-gray-700">
                  <EditField value={edu.institution} />
                </p>
                <p className="text-xs text-gray-700">
                  <EditField value={edu.year} />
                </p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase mb-2 text-gray-800">
              Key Skills
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {skills.map((skill, i) => (
                <li key={i}>
                  <EditField value={skill} />
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase mb-2 text-gray-800">
              Languages
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {languages.map((lang, i) => (
                <li key={i}>
                  <EditField value={lang} />
                </li>
              ))}
            </ul>
          </section>
        </aside>

        {/* Main Content */}
        <section className="col-span-2 p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-gray-900">
              <EditField value={name} />
            </h1>
          </div>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Professional Profile
            </h2>
            <p className="text-sm text-gray-700">
              <EditField value={summary} multiline />
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Experience
            </h2>
            {experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <p className="font-medium text-gray-800">
                  <EditField value={exp.role} />
                </p>
                <p className="text-sm text-gray-600">
                  <EditField value={exp.company} /> |{" "}
                  <EditField value={exp.duration} />
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                  {(exp.description || "").split("\n").map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {projects.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                Projects
              </h2>
              {projects.map((project, i) => (
                <div key={i} className="mb-3">
                  <p className="font-medium text-gray-800">
                    <EditField value={project.title} />
                  </p>
                  <p className="text-sm text-gray-700">
                    <EditField value={project.description} multiline />
                  </p>
                </div>
              ))}
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                Certifications
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {certifications.map((cert, i) => (
                  <li key={i}>
                    <EditField value={cert} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {achievements.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                Achievements
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {achievements.map((achieve, i) => (
                  <li key={i}>
                    <EditField value={achieve} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {publications.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                Publications
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {publications.map((pub, i) => (
                  <li key={i}>
                    <EditField value={pub} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {referral.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                Referrals
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {referral.map((ref, i) => (
                  <li key={i}>
                    <EditField value={ref} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>
      </div>
    </main>
  );
};

export default NewTemplate1;
