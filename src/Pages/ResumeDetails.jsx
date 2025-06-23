import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import edit from '../assets/edit.png'
import add from '../assets/add.png'
import bin from '../assets/bin.png'

export default function ResumeDetails() {
    const {id} = useParams();
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState({
        experience: false,
        education: false,
        skills: false,
        languages: false,
        certifications: false,
        achievements: false,
        referral: false,
        projects: false,
    });

    useEffect(()=>{
        const fetchResume=async()=>{
            try{
                const response = await axios.get(`http://localhost:4000/api/resume/${id}`)
                const data = response.data;

                data.skills = data.skills?.map(s => typeof s === "string" ? { name: s } : s);
                data.languages = data.languages?.map(l => typeof l === "string" ? { name: l } : l);

                setResume(data);
            }
            catch{
                setError(err.response?.data?.error || "Failed to fetch resume");
            }
            finally {
                setLoading(false);
            }
        }
        fetchResume();
    },[id])

    const handleChange = (field, index, key, value) => {
        const updatedSection = [...resume[field]];
        if (typeof updatedSection[index] === 'string') {
            updatedSection[index] = value;
        } else {
            updatedSection[index][key] = value;
        }
        setResume({ ...resume, [field]: updatedSection });
        };

    const handleEditToggle = (field) => {
        setIsEditing({ ...isEditing, [field]: !isEditing[field] });
    };

    const handleSave = async() => {
    try {
        const normalizeArray = (arr) =>
            arr?.map(item => typeof item === "string" ? item : item.name || item);
        const res = await axios.put(`http://localhost:4000/api/resume/${id}/update`,  {
        ...resume,
        type: resume.type || "General", // fallback type
        skills: normalizeArray(resume.skills),
        certifications: normalizeArray(resume.certifications),
        achievements: normalizeArray(resume.achievements),
        referral: normalizeArray(resume.referral),
        languages: normalizeArray(resume.languages),
        });
        setResume(res.data);
        alert("saved details")
    } catch (err) {
        alert("Failed to save");
    }
    };

    const handleAddField = (field, defaultObject) => {
    const newEntry = { ...defaultObject, _isNew: true }; // mark as new
    setResume(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), newEntry]
    }));
    };

    const handleDeleteField = (field, index) => {
        setResume(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

    const inputStyle = 'bg-zinc-800 text-white border border-zinc-600 px-3 py-2 rounded w-full';
    const labelStyle = 'text-lg font-medium text-white';
  return (
    <div className="bg-black min-h-screen text-white p-8">
        <div className="max-w-7xl mx-auto bg-black border-1 border-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold text-center mb-6">{resume.name}'s Resume</h1>

        {/*Contact info*/}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="email" className={labelStyle}>Email</label>
                <input className={inputStyle} value={resume.email} readOnly />
            </div>
            <div>
                <label htmlFor="address" className={labelStyle}>Address</label>
                <input className={inputStyle} value={resume.address} readOnly />
            </div>
            <div>
            <label htmlFor="phone" className={labelStyle}>Phone</label>
            <input className={inputStyle} value={resume.phone || ''} readOnly />
            </div>
        </div>
      </div>

        {/*Education*/}
       <section className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Education</h2>
            <div className="space-x-4">
              <button
                onClick={() =>
                  handleAddField('education', {
                    degree: '',
                    institution: '',
                    year: '',
                    cgpa: '',
                  })
                }
                className="text-green-400 underline"
              >
                <img src={add} width={30} height={30} alt="Add Icon" />
              </button>
              <button
                onClick={() => handleEditToggle('education')}
                className="text-blue-400 underline"
              >
                {isEditing.education ? 'Stop Editing' : <img src={edit} width={30} height={30} alt="Edit Icon" />}
              </button>
            </div>
          </div>
          {resume.education?.map((ed, index) => (
            <div key={index} className="mb-4 p-4 bg-black border-1 border-white rounded">
              <h3 className="text-lg font-semibold mb-2">Education {index + 1}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>Degree</label>
                  <input
                    value={ed.degree}
                    onChange={(e) => handleChange('education', index, 'degree', e.target.value)}
                    readOnly={!isEditing.education}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelStyle}>Institution</label>
                  <input
                    value={ed.institution}
                    onChange={(e) => handleChange('education', index, 'institution', e.target.value)}
                    readOnly={!isEditing.education}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelStyle}>Year</label>
                  <input
                    value={ed.year}
                    onChange={(e) => handleChange('education', index, 'year', e.target.value)}
                    readOnly={!isEditing.education}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelStyle}>CGPA</label>
                  <input
                    value={ed.cgpa}
                    onChange={(e) => handleChange('education', index, 'cgpa', e.target.value)}
                    readOnly={!isEditing.education}
                    className={inputStyle}
                  />
                </div>
              </div>
              {isEditing.education && (
                <button
                  onClick={() => handleDeleteField('education', index)}
                  className={`mt-2 text-sm underline ${
                    ed._isNew ? 'text-orange-400' : 'text-red-400'
                  }`}
                >
                  {ed._isNew ? <img src={bin} width={30} height={30} alt="delete Icon" /> : 'Cancel'}
                </button>
              )}
            </div>
          ))}
        </section>

      {/*Projects*/}

      <section className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Projects</h2>
            <div className="space-x-4">
              <button
                onClick={() => handleAddField('projects', { title: '', tech: '', description: '' })}
                className="text-green-400 underline"
              >
                <img src={add} width={30} height={30} alt="Add Icon" />
              </button>
              <button
                onClick={() => handleEditToggle('projects')}
                className="text-blue-400 underline"
              >
                {isEditing.projects ? 'Stop Editing' : <img src={edit} width={30} height={30} alt="Edit Icon" />}
              </button>
            </div>
          </div>
          {resume.projects?.map((proj, index) => (
            <div key={index} className="mb-4 p-4 bg-black border-1 border-white rounded">
              <h3 className="text-lg font-semibold mb-2">Project {index + 1}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>Title</label>
                  <input
                    value={proj.title}
                    onChange={(e) => handleChange('projects', index, 'title', e.target.value)}
                    readOnly={!isEditing.projects}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelStyle}>Tech</label>
                  <input
                    value={proj.tech}
                    onChange={(e) => handleChange('projects', index, 'tech', e.target.value)}
                    readOnly={!isEditing.projects}
                    className={inputStyle}
                  />
                </div>
                <div className="col-span-2">
                  <label className={labelStyle}>Description</label>
                  <input
                    value={proj.description}
                    onChange={(e) => handleChange('projects', index, 'description', e.target.value)}
                    readOnly={!isEditing.projects}
                    className={inputStyle}
                  />
                </div>
              </div>
              {isEditing.projects && (
                <button
                  onClick={() => handleDeleteField('projects', index)}
                  className={`mt-2 text-sm underline ${proj._isNew ? 'text-orange-400' : 'text-red-400'}`}
                >
                  {proj._isNew ? <img src={bin} width={30} height={30} alt="delete Icon" /> : 'Cancel'}
                </button>
              )}
            </div>
          ))}
        </section>


      {/*Experience*/}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-2">
         <h3 className="text-lg font-semibold mb-2">Experience</h3>
          <div className='space-x-4'>
             <button
                onClick={() => handleAddField("experience", {
                role: "",
                company: "",
                duration: "",
                _isNew: true
                })}
                className="text-green-600 underline"
            >
             <img src={add} width={30} height={30} alt="Add Icon" />
            </button>
            <button onClick={() => handleEditToggle("experience")} className="text-blue-600 underline">
            {isEditing.experience ? "Stop Editing" : <img src={edit} width={30} height={30} alt="Edit Icon" />}
            </button>
         </div>
        </div>
        {resume.experience?.map((exp, index) => (
            <div key={index} className="mb-4 p-4 bg-black border-1 border-white rounded">
                <h3 className="text-lg font-semibold mb-2">Experience {index + 1}</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                <label htmlFor="role" className={labelStyle}>Role</label>
                <input
                    value={exp.role}
                    onChange={(e) => handleChange("experience", index, "role", e.target.value)}
                    readOnly={!isEditing.experience}
                    className={inputStyle}
                />
                </div>
                <div>
                <label htmlFor="company" className={labelStyle}>Company</label>
                <input
                    value={exp.company}
                    onChange={(e) => handleChange("experience", index, "company", e.target.value)}
                    className={inputStyle}
                    readOnly={!isEditing.experience}
                />
                </div>
                <div>
                <label htmlFor="duration" className={labelStyle}>Duration</label>
                <input
                    value={exp.duration}
                    onChange={(e) => handleChange("experience", index, "duration", e.target.value)}
                    className={inputStyle}
                    readOnly={!isEditing.experience}
                />
                </div>
                </div>
                {isEditing.experience && (
                    <div className="mt-2">
                        <button
                        onClick={() => handleDeleteField("experience", index)}
                        className={`text-sm underline ${
                            exp._isNew ? "text-orange-600" : "text-red-600"
                        }`}
                        >
                        {exp._isNew ? <img src={bin} width={30} height={30} alt="delete Icon" /> : "Cancel"}
                        </button>
                    </div>
                    )}
            </div>
        ))}
      </section>
    
        {/*Skills*/}
        <section className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className='space-x-4'>
                <button
                    onClick={() => handleAddField("skills", {
                        name:"",
                    _isNew: true
                    })}
                    className="text-green-600 underline"
                >
                <img src={add} width={30} height={30} alt="Add Icon" />
                </button>
                <button onClick={() => handleEditToggle("skills")} className="text-blue-600 underline">
                {isEditing.skills ? "Stop Editing" : <img src={edit} width={30} height={30} alt="Edit Icon" />}
                </button>
                </div>
            </div>
        {resume.skills?.map((skill, index) => (
           <div key={index} className="mb-4 p-4 bg-black border-1 border-white rounded">
                <label htmlFor={`skill-${index}`} className='text-lg font-semibold mb-2'>{`Skill ${index + 1}`}</label>
                <input
                    id={`skill-${index}`}
                    value={skill.name}
                    onChange={(e) => handleChange("skills", index, "name", e.target.value)}
                    className={inputStyle}
                    readOnly={!isEditing.skills}
                />

                {isEditing.skills && (
                    <div className="mt-2">
                        <button
                        onClick={() => handleDeleteField("skills", index)}
                        className={`text-sm underline text-red-600 ${
                            skill._isNew ? "text-orange-600" : "text-red-600"
                        }`}
                        >
                        {skill._isNew ? <img src={bin} width={30} height={30} alt="delete Icon" /> : "Cancel"}
                        </button>
                    </div>
            )}
            
           </div>
        ))}
          
        
      </section>

    {/*Certifications*/}
      <section className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                <div className='space-x-4'>
                    <button
                        onClick={() => handleAddField("certifications", {
                            name:"",
                        _isNew: true
                        })}
                        className="text-green-600 underline"
                    >
                    <img src={add} width={30} height={30} alt="Add Icon" />
                    </button>
                    <button onClick={() => handleEditToggle("certifications")} className="text-blue-600 underline">
                    {isEditing.certifications ? "Stop Editing" : <img src={edit} width={30} height={30} alt="Edit Icon" />}
                    </button>
                </div>
            </div>
        {resume.certifications?.map((cert, index) => (
            <div key={index} className="mb-4 p-4 bg-black border-1 border-white rounded">
                <h3 className='text-lg font-semibold mb-2'>Certificate {index + 1}</h3>
                <input
                    value={cert.name}
                    onChange={(e) => handleChange("certifications", index, "name", e.target.value)}
                    className={inputStyle}
                    readOnly={!isEditing.certifications}
                />

                {isEditing.certifications && (
                    <div className="mt-2">
                        <button
                        onClick={() => handleDeleteField("certifications", index)}
                        className={`text-sm underline ${
                            cert._isNew ? "text-orange-600" : "text-red-600"
                        }`}
                        >
                        {cert._isNew ? <img src={bin} width={30} height={30} alt="delete Icon" /> : "Cancel"}
                        </button>
                    </div>
                    )}
            
            </div>
        ))}

      </section>

      {/*Achievements*/}
      <section className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold mb-2">Achievements</h3>
                    <div className='space-x-4'>
                        <button
                            onClick={() => handleAddField("achievements", {
                                name:"",
                            _isNew: true
                            })}
                            className="text-green-600 underline"
                        >
                        <img src={add} width={30} height={30} alt="Add Icon" />
                        </button>
                        <button onClick={() => handleEditToggle("achievements")} className="text-blue-600 underline">
                        {isEditing.achievements ? "Stop Editing" : <img src={edit} width={30} height={30} alt="Edit Icon" />}
                        </button>
                    </div>
            </div>
        {resume.achievements?.map((achievement, index) => (
            <div key={index} className="mb-4 p-4 bg-black border-1 border-white rounded">
                <h3 className='text-lg font-semibold mb-2'>Achievement {index + 1}</h3>
                <input
                    value={achievement.name}
                    onChange={(e) => handleChange("achievements", index, "name", e.target.value)}
                    className={inputStyle}
                    readOnly={!isEditing.achievements}
                />

                {isEditing.achievements && (
                <div className="mt-2">
                    <button
                    onClick={() => handleDeleteField("achievements", index)}
                    className={`text-sm underline ${
                        achievement._isNew ? "text-orange-600" : "text-red-600"
                    }`}
                    >
                    {achievement._isNew ? <img src={bin} width={30} height={30} alt="delete Icon" /> : "Cancel"}
                    </button>
                </div>
                )}
          
            </div>
        ))}
      </section>

      {/*Languages*/}
      <section className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold mb-2">Languages</h3>
                    <div className='space-x-4'>
                        <button
                            onClick={() => handleAddField("languages", {
                                name:"",
                            _isNew: true
                            })}
                            className="text-green-600 underline"
                        >
                        <img src={add} width={30} height={30} alt="Add Icon" />
                        </button>
                        <button onClick={() => handleEditToggle("languages")} className="text-blue-600 underline">
                        {isEditing.languages ? "Stop Editing" : <img src={edit} width={30} height={30} alt="Edit Icon" />}
                        </button>
                    </div>
            </div>
        {resume.languages?.map((language, index) => (
            <div key={index} className="mb-4 p-4 bg-black border-1 border-white rounded">
                <h3 className='text-lg font-semibold mb-2'>Language {index + 1}</h3>
                <input
                    value={language.name}
                    onChange={(e) => handleChange("languages", index, "name", e.target.value)}
                    className={inputStyle}
                    readOnly={!isEditing.languages}
                />

                {isEditing.languages && (
                    <div className="mt-2">
                        <button
                        onClick={() => handleDeleteField("languages", index)}
                        className={`text-sm underline ${
                            language._isNew ? "text-orange-600" : "text-red-600"
                        }`}
                        >
                        {language._isNew ? <img src={bin} width={30} height={30} alt="delete Icon" /> : "Cancel"}
                        </button>
                    </div>
                    )}
        
            </div>
        ))}
        
      </section>

      {/*Referrals*/}
      <section className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold mb-2">Referrals</h3>
                    <div className='space-x-4'>
                        <button
                            onClick={() => handleAddField("referral", {
                                name:"",
                            _isNew: true
                            })}
                            className="text-green-600 underline"
                        >
                        <img src={add} width={30} height={30} alt="Add Icon" />
                        </button>
                        <button onClick={() => handleEditToggle("referral")} className="text-blue-600 underline">
                        {isEditing.referral ? "Stop Editing" : <img src={edit} width={30} height={30} alt="Edit Icon" />}
                        </button>
                    </div>
            </div>
        {resume.referral?.map((referral, index) => (
            <div key={index} className="mb-4 p-4 bg-black border-1 border-white rounded">
                <h3 className='text-lg font-semibold mb-2'>Referral {index + 1}</h3>
                <input
                    value={referral.name}
                    onChange={(e) => handleChange("referral", index, "name", e.target.value)}
                    className={inputStyle}
                    readOnly={!isEditing.referral}
                />
                {isEditing.referral && (
                <div className="mt-2">
                    <button
                    onClick={() => handleDeleteField("referral", index)}
                    className={`text-sm underline ${
                        referral._isNew ? "text-orange-600" : "text-red-600"
                    }`}
                    >
                    {referral._isNew ? <img src={bin} width={30} height={30} alt="delete Icon" /> : "Cancel"}
                    </button>
                </div>
                )}
            </div>
            
        ))}
      </section>
       <button className='ml-80 bg-white text-black font-bold px-3 py-2 rounded w-xl' onClick={handleSave}>Save Changes</button>
      </div>
      
      </div>
  )
}


