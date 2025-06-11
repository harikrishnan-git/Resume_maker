import React from 'react'
import {useState} from 'react'

export default function ResumeForm() {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const [expForm, setExpForm] = useState([
        {company: '', role: '', duration: '' }
    ]);
    const [educationFields, setEducationFields] = useState([
    { degree: '', institution: '', year: '', cgpa: '' },
  ]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [objective, setObjective] = useState('');
  const [skills,setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [referral, setReferral] = useState([]);

  const handleAddLanguages = ()=>{
    setLanguages([...languages, '']);
  }
 const handleLanguagesChange = (index, event) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = event.target.value;
    setLanguages(updatedLanguages);
 }

 const handleAddCertifications = () => {
    setCertifications([...certifications, '']); 
 }
 const handleCertificationsChange = (index, event) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = event.target.value;
    setCertifications(updatedCertifications);
    }

    const handleAddAchievements = () => {
    setAchievements([...achievements, '']);
  };
    const handleAchievementsChange = (index, event) => {
    const updatedAchievements = [...achievements];
    updatedAchievements[index] = event.target.value;
    setAchievements(updatedAchievements);
    };

    const handleAddReferrals = (event) => {
    setReferral([...referral, '']);    
};

    const handleReferralChange = (index, event) => {
    const updatedReferral = [...referral];
    updatedReferral[index] = event.target.value;
    setReferral(updatedReferral);
};


  const handleAddEducation = () => {
    setEducationFields([
      ...educationFields,
      { degree: '', institution: '', year: '', cgpa: '' },
    ]);
  };

  const handleEducationChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...educationFields];
    updatedFields[index][name] = value;
    setEducationFields(updatedFields);
  };
    
  const handleAddExperience = () => {
    setExpForm([
      ...expForm,
      { company: '', role: '', duration: '' },
    ]);
  };

  const handleExpChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...expForm];
    updatedFields[index][name] = value;
    setExpForm(updatedFields);
  }

  const handleAddSkills = ()=>{
    setSkills([...skills, '']);
  }

    const handleSkillsChange = (index, event) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = event.target.value;
    setSkills(updatedSkills);
  }

  const handleSubmit=async()=>{
    const resumeData = {name,
      email,
      address,
      objective,
      skills,
      education: educationFields,
      experience: expForm,
      referral,
      certifications,
      achievements,
      languages,}
    await fetch(`http://localhost:4000/api/user/${userId}/create-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(resumeData),
    });
  }

return (
  <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-8">
    <h1 className="text-3xl font-bold text-center mb-6">Resume Builder</h1>

    {/* Personal Information */}
    <section>
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Full Name" className="input" value={name} onChange={(e)=>setName(e.target.value)} />
        <input type="email" placeholder="Email" className="input" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <textarea placeholder="Address" className="input md:col-span-2" value={address} onChange={(e)=>setAddress(e.target.value)}/>
      </div>
    </section>

    {/* Career Objective */}
    <section>
      <h2 className="text-xl font-semibold mb-4">Career Objective</h2>
      <textarea placeholder="Your career objective..." className="input w-full" value={objective} onChange={(e)=>setObjective(e.target.value)}/>
    </section>

    {/* Skills */}
    <section>
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      {skills.map((skill, index) => (
        <input
          key={index}
          type="text"
          value={skill}
          onChange={(e) => handleSkillsChange(index, e)}
          placeholder="Skill"
          className="input mb-2 w-full"
        />
      ))}
      <button type="button" onClick={handleAddSkills} className="btn">+ Add Skill</button>
    </section>

    {/* Education */}
    <section>
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      {educationFields.map((field, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" name="degree" value={field.degree} onChange={(e) => handleEducationChange(index, e)} placeholder="Degree" className="input" />
          <input type="text" name="institution" value={field.institution} onChange={(e) => handleEducationChange(index, e)} placeholder="Institution" className="input" />
          <input type="text" name="year" value={field.year} onChange={(e) => handleEducationChange(index, e)} placeholder="Year of Passing" className="input" />
          <input type="number" name="cgpa" value={field.cgpa} onChange={(e) => handleEducationChange(index, e)} placeholder="CGPA" className="input" />
        </div>
      ))}
      <button type="button" onClick={handleAddEducation} className="btn">+ Add Education</button>
    </section>

    {/* Experience */}
    <section>
      <h2 className="text-xl font-semibold mb-4">Experience</h2>
      {expForm.map((field, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" name="company" value={field.company} onChange={(e) => handleExpChange(index, e)} placeholder="Company Name" className="input" />
          <input type="text" name="role" value={field.role} onChange={(e) => handleExpChange(index, e)} placeholder="Role" className="input" />
          <input type="text" name="duration" value={field.duration} onChange={(e) => handleExpChange(index, e)} placeholder="Duration" className="input md:col-span-2" />
        </div>
      ))}
      <button type="button" onClick={handleAddExperience} className="btn">+ Add Experience</button>
    </section>

    {/* Referral */}
    <section>
      <h2 className="text-xl font-semibold mb-4">Referral</h2>
      {referral.map((ref, index) => (
        <input key={index} type="text" value={ref} onChange={(e) => handleReferralChange(index, e)} placeholder="Referral Name" className="input mb-2 w-full" />
      ))}
      <button onClick={handleAddReferrals} className="btn">+ Add Referral</button>
    </section>

    {/* Certifications */}
    <section>
      <h2 className="text-xl font-semibold mb-4">Certifications (PDF)</h2>
      {certifications.map((cert, index) => (
        <input key={index} type="file" accept="application/pdf" onChange={(e) => handleCertificationsChange(index, e)} className="input mb-2 w-full" />
      ))}
      <button onClick={handleAddCertifications} className="btn">+ Add Certification</button>
    </section>

    {/* Achievements */}
    <section>
      <h2 className="text-xl font-semibold mb-4">Achievements (PDF)</h2>
      {achievements.map((ach, index) => (
        <input key={index} type="file" accept="application/pdf" onChange={(e) => handleAchievementsChange(index, e)} className="input mb-2 w-full" />
      ))}
      <button onClick={handleAddAchievements} className="btn">+ Add Achievement</button>
    </section>

    {/* Languages */}
    <section>
      <h2 className="text-xl font-semibold mb-4">Languages</h2>
      {languages.map((lang, index) => (
        <input key={index} type="text" value={lang} onChange={(e) => handleLanguagesChange(index, e)} placeholder="Language" className="input mb-2 w-full" />
      ))}
      <button onClick={handleAddLanguages} className="btn">+ Add Language</button>
    </section>
    <button onClick={handleSubmit}>Submit</button>
  </div>
);

}
