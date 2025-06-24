const Resume = () => {
  const resume = JSON.parse(localStorage.getItem("resume"));
  if (!resume)
    return <div className="text-center text-gray-500">Loading...</div>;

  const {
    name,
    address,
    summary,
    email,
    phone,
    website,
    linkedin,
    github,
    skills = [],
    education = [],
    experience = [],
    publications = [],
    projects = [],
    certifications = [],
    achievements = [],
    referral = [],
    location,
    languages = [],
  } = resume["optimizedResume"];

  return (
    <div className="bg-white text-gray-900 max-w-4xl mx-auto p-10 font-sans">
      {/* Header */}
      <header className="text-center border-b pb-4">
        <h1 className="text-3xl font-bold">{name}</h1>
        <div className="mt-2 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <span>{location}</span>
          <a href={`mailto:${email}`} className="hover:underline">
            {email || null}
          </a>
          <a href={`tel:${address}`} className="hover:underline">
            {address || null}
          </a>
          <a href={`tel:${phone}`} className="hover:underline">
            {phone || null}
          </a>
          <a href={website} className="hover:underline">
            {website ? website.replace(/https?:\/\//, "") : null}
          </a>
          <a href={linkedin} className="hover:underline">
            {linkedin ? "LinkedIn" : null}
          </a>
          <a href={github} className="hover:underline">
            {github ? "GitHub" : null}
          </a>
        </div>
      </header>

      {/* Section Component */}
      {summary && (
        <Section title="Career Objective">
          <p>{summary}</p>
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills">
          <ul className="list-disc list-inside">
            {skills.map((skill, i) => (
              <li key={i} className="text-sm text-gray-700">
                {skill}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu, i) => (
            <Entry
              key={i}
              title={edu.institution}
              subtitle={edu.degree}
              description={`Year: ${edu.year}, CGPA: ${edu.cgpa}`}
            />
          ))}
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((exp, i) => (
            <Entry
              key={i}
              title={exp.role}
              subtitle={exp.company}
              location={exp.location}
              duration={exp.duration}
            />
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((proj, i) => (
            <Entry
              key={i}
              title={proj.title}
              subtitle={proj.tech}
              description={proj.description}
            />
          ))}
        </Section>
      )}

      {publications.length > 0 && (
        <Section title="Publications">
          {publications.map((pub, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">{pub.title}</p>
              <p className="text-sm italic text-gray-600">
                {pub.authors.join(", ")}
              </p>
              <a
                href={pub.link}
                className="text-blue-600 text-sm hover:underline"
              >
                {pub.link.replace("https://", "")}
              </a>
            </div>
          ))}
        </Section>
      )}

      {achievements.length > 0 && (
        <Section title="Achievements">
          <ul className="list-disc list-inside">
            {achievements.map((ach, i) => (
              <li key={i} className="text-sm text-gray-700">
                {ach}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="Certifications">
          <ul className="list-disc list-inside">
            {certifications.map((cert, i) => (
              <li key={i} className="text-sm text-gray-700">
                {cert}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {languages.length > 0 && (
        <Section title="Languages">
          <ul className="list-disc list-inside">
            {languages.map((lang, i) => (
              <li key={i} className="text-sm text-gray-700">
                {lang}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {referral?.length > 0 && (
        <Section title="Referrals">
          <ul className="list-disc list-inside">
            {referral.map((ref, i) => (
              <li key={i} className="text-sm text-gray-700">
                {ref}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/*{technologies.length > 0 && (
        <Section title="Technologies">
          <p>
            <strong>Languages:</strong> {technologies.languages.join(", ")}
          </p>
          <p>
            <strong>Tools & Frameworks:</strong> {technologies.tools.join(", ")}
          </p>
        </Section>
      )}*/}
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="mt-8">
    <h2 className="text-xl font-bold border-b mb-2 pb-1 text-blue-800">
      {title}
    </h2>
    <div>{children}</div>
  </section>
);

const Entry = ({ title, subtitle, location, duration, description }) => (
  <div className="mb-4">
    <div className="flex justify-between flex-wrap text-sm text-gray-700">
      <span className="font-semibold">{title}</span>
      {duration && <span>{duration}</span>}
    </div>
    {subtitle && <p className="italic text-sm text-gray-600">{subtitle}</p>}
    {location && <p className="text-sm text-gray-500">{location}</p>}
    {description && (
      <p className="list-disc list-inside mt-1 text-sm">{description}</p>
    )}
  </div>
);

export default Resume;
