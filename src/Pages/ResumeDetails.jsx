import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
                setResume(response.data);
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
        const res = await axios.put(`http://localhost:4000/api/resume/${id}/update`,  {
        ...resume,
        type: resume.type || "General", // fallback type
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
  return (
    <div className=" mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">{resume.name}'s Resume</h1>

        {/*Contact info*/}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Contact Info</h2>
        <div className="grid grid-cols-2 gap-2">
        <label htmlFor="email">Email</label>
        <input className="border px-2 py-1 block mb-2" value={resume.email} readOnly />
        <label htmlFor="address">Address</label>
        <input className="border px-2 py-1 block mb-2" value={resume.address} readOnly />
        <label htmlFor="phone">Phone</label>
        <input className="border px-2 py-1 block" value={resume.phone || ''} readOnly />
        </div>
      </div>

        {/*Education*/}
      <div className="mb-4">
         <h2 className="text-lg font-semibold flex justify-between items-center">
            Education
            <button
                onClick={() => handleAddField("education", {
                degree: "",
                institution: "",
                year: "",
                cgpa: "",
                _isNew: true
                })}
                className="text-green-600 underline"
            >
                Add
            </button>

            <button onClick={() => handleEditToggle("education")} className="text-blue-600 underline">
            {isEditing.education ? "Stop Editing" : "Edit"}
            </button>
        </h2>
        {resume.education?.map((ed, index) => (
            <div key={index} >
            <h2>Education {index + 1}</h2>
            <div className="grid grid-cols-2 gap-2">
                <label>Degree</label>
                <input
                    value={ed.degree}
                    onChange={(e) => handleChange("education", index, "degree", e.target.value)}
                    readOnly={!isEditing.education}
                    className="border px-2 py-1 mr-2"
                />
                <label>Institution</label>
                <input
                    value={ed.institution}
                    onChange={(e) => handleChange("education", index, "institution", e.target.value)}
                    readOnly={!isEditing.education}
                    className="border px-2 py-1 mr-2"
                />
                <label>Year</label>
                <input
                    value={ed.year}
                    onChange={(e) => handleChange("education", index, "year", e.target.value)}
                    readOnly={!isEditing.education}
                    className="border px-2 py-1"
                />
                <label>CGPA</label>
                <input
                    value={ed.cgpa}
                    onChange={(e) => handleChange("education", index, "cgpa", e.target.value)}
                    readOnly={!isEditing.education}
                    className="border px-2 py-1"
                />
                </div>

                 {isEditing.education && (
                    <div className="mt-2">
                        <button
                        onClick={() => handleDeleteField("education", index)}
                        className={`text-sm underline ${
                            ed._isNew ? "text-orange-600" : "text-red-600"
                        }`}
                        >
                        {ed._isNew ? "Delete" : "Cancel"}
                        </button>
                    </div>
                    )}
            </div>

        ))}

      </div>

      {/*Projects*/}

      <div className="mb-4">
         <h2 className="text-lg font-semibold flex justify-between items-center">
            Projects
             <button
                onClick={() => handleAddField("projects", {
                title: "",
                tech: "",
                description: "",
                _isNew: true
                })}
                className="text-green-600 underline"
            >
                Add
            </button>
            <button onClick={() => handleEditToggle("projects")} className="text-blue-600 underline">
            {isEditing.projects ? "Cancel" : "Edit"}
            </button>
        </h2>
        {resume.projects?.map((proj, index) => (
            <div key={index} className="mb-2">
            <div className="grid grid-cols-2 gap-2">
                <label>Title</label>
                <input
                    value={proj.title}
                    onChange={(e) => handleChange("projects", index, "title", e.target.value)}
                    readOnly={!isEditing.projects}
                    className="border px-2 py-1 mr-2"
                />
                <label>Tech</label>
                <input
                    value={proj.tech}
                    onChange={(e) => handleChange("projects", index, "tech", e.target.value)}
                    readOnly={!isEditing.projects}
                    className="border px-2 py-1 mr-2"
                />
                <label>Description</label>
                <input
                    value={proj.description}
                    onChange={(e) => handleChange("projects", index, "description", e.target.value)}
                    readOnly={!isEditing.description}
                    className="border px-2 py-1"
                />
                </div>
                {isEditing.projects && (
                    <div className="mt-2">
                        <button
                        onClick={() => handleDeleteField("projects", index)}
                        className={`text-sm underline ${
                            proj._isNew ? "text-orange-600" : "text-red-600"
                        }`}
                        >
                        {proj._isNew ? "Delete" : "Cancel"}
                        </button>
                    </div>
                    )}
            </div>
        ))}

      </div>


      {/*Experience*/}
      <div className="mb-4">
         <h2 className="text-lg font-semibold flex justify-between items-center">
            Experience
             <button
                onClick={() => handleAddField("experience", {
                role: "",
                company: "",
                duration: "",
                _isNew: true
                })}
                className="text-green-600 underline"
            >
                Add
            </button>
            <button onClick={() => handleEditToggle("experience")} className="text-blue-600 underline">
            {isEditing.experience ? "Stop Editing" : "Edit"}
            </button>
        </h2>
        {resume.experience?.map((exp, index) => (
            <div key={index} className="mb-2">
                <div className="grid grid-cols-2 gap-2">
                <label htmlFor="role">Role</label>
                <input
                    value={exp.role}
                    onChange={(e) => handleChange("experience", index, "role", e.target.value)}
                    className="border px-2 py-1 mr-2"
                    readOnly={!isEditing.experience}
                />
                <label htmlFor="company">Company</label>
                <input
                    value={exp.company}
                    onChange={(e) => handleChange("experience", index, "company", e.target.value)}
                    className="border px-2 py-1 mr-2"
                    readOnly={!isEditing.experience}
                />
                <label htmlFor="duration">Duration</label>
                <input
                    value={exp.duration}
                    onChange={(e) => handleChange("experience", index, "duration", e.target.value)}
                    className="border px-2 py-1"
                    readOnly={!isEditing.experience}
                />
                </div>
                {isEditing.experience && (
                    <div className="mt-2">
                        <button
                        onClick={() => handleDeleteField("experience", index)}
                        className={`text-sm underline ${
                            exp._isNew ? "text-orange-600" : "text-red-600"
                        }`}
                        >
                        {exp._isNew ? "Delete" : "Cancel"}
                        </button>
                    </div>
                    )}
            </div>
        ))}
      </div>
    
        {/*Skills*/}
      <div className="mb-4">
         <h2 className="text-lg font-semibold flex justify-between items-center">
            Skills
             <button
                onClick={() => handleAddField("skills", {
                    name:"",
                _isNew: true
                })}
                className="text-green-600 underline"
            >
                Add
            </button>
            <button onClick={() => handleEditToggle("skills")} className="text-blue-600 underline">
            {isEditing.skills ? "Stop Editing" : "Edit"}
            </button>
        </h2>
        <ul className="list-disc ml-5">
        {resume.skills?.map((skill, index) => (
           <div className="grid grid-cols-2 gap-2" key={index}>
                <label htmlFor="htmlFor={`skill-${index}`}">{`Skill ${index + 1}`}</label>
                <input
                    id={`skill-${index}`}
                    value={skill}
                    onChange={(e) => handleChange("skills", index, "name", e.target.value)}
                    className="border px-2 py-1"
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
                        {skill._isNew ? "Delete" : "Cancel"}
                        </button>
                    </div>
            )}
            
           </div>
        ))}
          
        </ul>
      </div>

    {/*Certifications*/}
      <div className="mb-4">
        <h2 className="text-lg font-semibold flex justify-between items-center">
            Certifications
             <button
                onClick={() => handleAddField("certifications", {
                _isNew: true
                })}
                className="text-green-600 underline"
            >
                Add
            </button>
            <button onClick={() => handleEditToggle("certifications")} className="text-blue-600 underline">
            {isEditing.certifications ? "Stop Editing" : "Edit"}
            </button>
        </h2>
        {resume.certifications?.map((cert, index) => (
            <div className="grid grid-cols-2 gap-2" key={index}>
            
                <input
                    value={cert}
                    onChange={(e) => handleChange("certifications", index, null, e.target.value)}
                    className="border px-2 py-1"
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
                        {cert._isNew ? "Delete" : "Cancel"}
                        </button>
                    </div>
                    )}
            
            </div>
        ))}
        
      </div>

      {/*Achievements*/}
      <div className="mb-4">
        <h2 className="text-lg font-semibold flex justify-between items-center">
            Achievements
             <button
                onClick={() => handleAddField("achievements", {
                _isNew: true
                })}
                className="text-green-600 underline"
            >
                Add
            </button>
            <button onClick={() => handleEditToggle("achievements")} className="text-blue-600 underline">
            {isEditing.achievements ? "Stop Editing" : "Edit"}
            </button>
        </h2>
        {resume.achievements?.map((achievement, index) => (
            <div className="grid grid-cols-2 gap-2" key={index}>
            
                <input
                    value={achievement}
                    onChange={(e) => handleChange("achievements", index, null, e.target.value)}
                    className="border px-2 py-1"
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
                    {achievement._isNew ? "Delete" : "Cancel"}
                    </button>
                </div>
                )}
          
            </div>
        ))}
      </div>

      {/*Languages*/}
      <div className="mb-4">
        <h2 className="text-lg font-semibold flex justify-between items-center">
            Languages
             <button
                onClick={() => handleAddField("languages", {
                _isNew: true
                })}
                className="text-green-600 underline"
            >
                Add
            </button>
            <button onClick={() => handleEditToggle("languages")} className="text-blue-600 underline">
            {isEditing.languages ? "Stop Editing" : "Edit"}
            </button>
        </h2>
        {resume.languages?.map((language, index) => (
            <div className="grid grid-cols-2 gap-2" key={index}>
            
                <input
                    value={language}
                    onChange={(e) => handleChange("languages", index, null, e.target.value)}
                    className="border px-2 py-1"
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
                        {language._isNew ? "Delete" : "Cancel"}
                        </button>
                    </div>
                    )}
        
            </div>
        ))}
        
      </div>

      {/*Referrals*/}
      <div className="mb-4">
        <h2 className="text-lg font-semibold flex justify-between items-center">
            Referrals
             <button
                onClick={() => handleAddField("referral", {
                _isNew: true
                })}
                className="text-green-600 underline"
            >
                Add
            </button>
            <button onClick={() => handleEditToggle("referral")} className="text-blue-600 underline">
            {isEditing.referral ? "Stop Editing" : "Edit"}
            </button>
        </h2>
        {resume.referral?.map((referral, index) => (
            <div className="grid grid-cols-2 gap-2" key={index}>
            
                <input
                    value={referral}
                    onChange={(e) => handleChange("referral", index, null, e.target.value)}
                    className="border px-2 py-1"
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
                    {referral._isNew ? "Delete" : "Cancel"}
                    </button>
                </div>
                )}
            </div>
            
        ))}
       
      </div>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  )
}
