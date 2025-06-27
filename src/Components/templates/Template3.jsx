import EditField from "../EditField";

export default function Template3() {
  const resume = JSON.parse(localStorage.getItem("resume"));
  console.log("Resume data:", resume);
  if (!resume)
    return <div className="text-center text-gray-500">Loading...</div>;

  const {
    type,
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
    <div className="relative w-[90%] max-w-[1200px] mx-auto mt-20 bg-white shadow-lg">
      {/* Top Bar */}
      <div className="h-[220px] bg-gray-500 text-white relative">
        <div className="text-black absolute left-1/2  text-center right-30 top-25  h-[120px] text-[58px] tracking-[8px] font-thin leading-[60px] font-raleway">
          <EditField value={name} />
        </div>
      </div>

      {/* Sidebar */}
      <div className="absolute top-[60px] left-[5%] w-[350px] bg-[#F7E0C1] p-[320px_30px_50px]">
        <div className="absolute top-[50px] left-[70px] h-[210px] w-[210px]">
          <div className="relative text-black h-[250px] w-[250px]">
            <svg
              viewBox="0 0 80 80"
              className="absolute h-full w-full stroke-black cursor-pointer"
            >
              <path
                d="M 10 10 L 52 10 L 72 30 L 72 70 L 30 70 L 10 50 Z"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>
          </div>
        </div>

        <p className="pl-[60px] mb-[20px] relative cursor-pointer before:absolute before:top-[-8px] before:left-[25px] before:h-[30px] before:w-[25px] before:bg-center before:bg-no-repeat before:bg-contain before:bg-[url('https://icons.veryicon.com/png/o/commerce-shopping/e-commerce-website-icon/address-81.png')]">
          <EditField value={address} />
        </p>
        <p className="pl-[60px] mb-[20px] relative cursor-pointer before:absolute before:top-[-3px] before:left-[25px] before:h-[30px] before:w-[30px] before:bg-center before:bg-no-repeat before:bg-contain before:bg-[url('https://www.pixsector.com/cache/dc0ee776/avd5c445f01ca4712be88.png')]">
          <EditField value={email} />
        </p>
        {github ? (
          <p className="pl-[60px] mb-[20px] relative cursor-pointer before:absolute before:top-[-3px] before:left-[25px] before:h-[30px] before:w-[30px] before:bg-center before:bg-no-repeat before:bg-contain before:bg-[url('https://cdn-icons-png.flaticon.com/512/25/25231.png')]">
            <EditField value={github} />
          </p>
        ) : (
          ""
        )}
        {linkedin ? (
          <p className="pl-[60px] mb-[20px] relative cursor-pointer before:absolute before:top-[-3px] before:left-[25px] before:h-[30px] before:w-[30px] before:bg-center before:bg-no-repeat before:bg-contain before:bg-[url(''https://cdn3.iconfinder.com/data/icons/social-media-2026/60/Socialmedia_icons_LinkedIn-128.png')]">
            <EditField value={linkedin} />
          </p>
        ) : (
          ""
        )}

        <p className="text-[18px] tracking-[4px] font-semibold leading-[28px] mt-[60px] mb-[10px] pb-[5px] border-b border-gray-600 uppercase">
          <EditField value="Expertise" />
        </p>
        {skills.length > 0 && (
          <div>
            {skills.map((skill, i) => (
              <p className="pl-[25px] mb-[10px]">
                <EditField value={skill} />
              </p>
            ))}
          </div>
        )}

        <p className="text-[18px] tracking-[4px] font-semibold leading-[28px] mt-[60px] mb-[10px] pb-[5px] border-b border-gray-600 uppercase">
          <EditField value="Education" />
        </p>
        {education.length > 0 && (
          <div>
            {education.map((ed, i) => (
              <div>
                <p className="pl-[25px] font-bold">
                  <EditField value={ed.institution} />
                </p>
                <p className="pl-[25px] ">
                  Degree: <EditField value={ed.degree} />
                </p>
                <p className="pl-[25px] ">
                  CGPA: <EditField value={ed.cgpa} />
                </p>
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <p className="text-[18px] tracking-[4px] font-semibold leading-[28px] mt-[60px] mb-[10px] pb-[5px] border-b border-gray-600 uppercase">
              <EditField value="Languages" />
            </p>

            {languages.map((lang, i) => (
              <p className="pl-[25px] mb-[10px]">
                <EditField value={lang} />
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="ml-[calc(350px+5%)] w-[calc(95%-350px)] p-[25px_40px_50px]">
        <h2 className="text-[30px] tracking-[5px] font-semibold leading-[40px] text-black uppercase text-center w-[80%] mx-auto">
          <EditField value={type} />
        </h2>
        <div className="w-[240px] h-[2px] bg-gray-600 mx-auto my-4" />
        <div className="bg-gray-300 w-full max-w-[580px] text-center text-[18px] tracking-[6px] font-semibold leading-[28px] mx-auto uppercase">
          <EditField value="Career Objective" />
        </div>
        <p className="text-justify mb-[50px]">
          <EditField value={summary} />
        </p>

        {experience.length > 0 && (
          <div className="bg-gray-300 w-full max-w-[580px] text-center text-[18px] tracking-[6px] font-semibold leading-[28px] mx-auto uppercase">
            <EditField value="Experience" />
          </div>
        )}

        {experience.length > 0 && (
          <div>
            {experience.map((exp, i) => (
              <div key={i} className="mb-8">
                <h3 className="text-[21px] tracking-[1px] font-semibold leading-[28px] text-black">
                  <EditField value={exp.role} />
                </h3>
                <p className="text-gray-500">
                  <EditField value={exp.company} />
                </p>
                <p className="text-justify">
                  <EditField value={exp.duration} />
                </p>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div className="bg-gray-300 w-full max-w-[580px] text-center text-[18px] tracking-[6px] font-semibold leading-[28px] mx-auto uppercase">
            <EditField value="Projects" />
          </div>
        )}

        {projects.length > 0 && (
          <div>
            {projects.map((proj, i) => (
              <div key={i} className="mb-8">
                <h3 className="text-[21px] tracking-[1px] font-semibold leading-[28px] text-black">
                  <EditField value={proj.title} />
                </h3>
                <p className="text-gray-500">
                  <EditField value={proj.tech} />
                </p>
                <p className="text-justify">
                  <EditField value={proj.description} />
                </p>
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div className="bg-gray-300 w-full max-w-[580px] text-center text-[18px] tracking-[6px] font-semibold leading-[28px] mx-auto uppercase">
            <EditField value="Certifications" />
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            {certifications.map((cert, i) => (
              <div key={i} className="mb-8">
                <p key={i} className="text-justify">
                  <EditField value={cert} />
                </p>
              </div>
            ))}
          </div>
        )}

        {publications.length > 0 && (
          <div className="bg-gray-300 w-full max-w-[580px] text-center text-[18px] tracking-[6px] font-semibold leading-[28px] mx-auto uppercase">
            <EditField value="Publications" />
          </div>
        )}

        {publications.length > 0 && (
          <div>
            {publications.map((pub, i) => (
              <div key={i} className="mb-8">
                <p key={i} className="text-justify">
                  <EditField value={pub} />
                </p>
              </div>
            ))}
          </div>
        )}

        {achievements.length > 0 && (
          <div className="bg-gray-300 w-full max-w-[580px] text-center text-[18px] tracking-[6px] font-semibold leading-[28px] mx-auto uppercase">
            <EditField value="Achievements" />
          </div>
        )}

        {achievements.length > 0 && (
          <div>
            {achievements.map((ach, i) => (
              <div key={i} className="mb-8">
                <p key={i} className="text-justify">
                  <EditField value={ach} />
                </p>
              </div>
            ))}
          </div>
        )}

        {referral.length > 0 && (
          <div className="bg-gray-300 w-full max-w-[580px] text-center text-[18px] tracking-[6px] font-semibold leading-[28px] mx-auto uppercase">
            <EditField value="Referrals" />
          </div>
        )}

        {referral.length > 0 && (
          <div>
            {referral.map((ref, i) => (
              <div key={i} className="mb-8">
                <p key={i} className="text-justify">
                  <EditField value={ref} />
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
