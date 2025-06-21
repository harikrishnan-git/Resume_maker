import Resume from "../Model/resumeModel.js";
import User from "../Model/userModel.js";

// POST /api/user/:userId/resume
export const createResume = async (req, res) => {
  const { userId } = req.params;
  const {
    type,
    name,
    email,
    address,
    objective,
    skills,
    education,
    experience,
    projects,
    referral,
    certifications,
    achievements,
    publications,
    languages,
  } = req.body;

  try {
    // Optional: check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const newResume = new Resume({
      type,
      user: userId,
      name,
      email,
      address,
      careerObjective: objective,
      skills,
      education,
      experience,
      projects,
      referral,
      certifications,
      achievements,
      publications,
      languages,
    });

    const savedResume = await newResume.save();

    res.status(201).json(savedResume);
  } catch (error) {
    console.error("Error creating resume:", error);
    res.status(500).json({ error: "Server error while creating resume" });
  }
};

// GET /api/resume
export const getResumes = async (req, res) => {
  const { userId } = req.params;

  try {
    // Optional: check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }
    const resumes = await Resume.find({ user: userId }).populate(
      "user",
      "name email"
    );
    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res
      .status(500)
      .json({ error: `Server error while fetching resumes: ${error.message}` });
  }
};

// GET /api/resume/:resumeId
export const getResumeById = async (req, res) => {
  const { resumeId } = req.params;

  try {
    const resume = await Resume.findById(resumeId).populate(
      "user",
      "name email"
    );
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.status(200).json(resume);
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateResume = async (req, res) => {
  const { resumeId } = req.params;
  const {
    type,
    name,
    email,
    address,
    objective,
    skills,
    education,
    experience,
    projects,
    referral,
    certifications,
    achievements,
    publications,
    languages,
  } = req.body;

  try {
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    resume.type = type || resume.type;
    resume.name = name || resume.name;
    resume.email = email || resume.email;
    resume.address = address || resume.address;
    resume.careerObjective = objective || resume.careerObjective;
    resume.skills = skills || resume.skills;
    resume.education = education || resume.education;
    resume.experience = experience || resume.experience;
    resume.projects = projects || resume.projects;
    resume.referral = referral || resume.referral;
    resume.certifications = certifications || resume.certifications;
    resume.achievements = achievements || resume.achievements;
    resume.publications = publications || resume.publications;
    resume.languages = languages || resume.languages;

    console.log('Updating resume with:', req.body);
    const updatedResume = await resume.save();
    res.status(200).json(updatedResume);
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({ error: error.message });
  }
};
export const deleteResumeFieldItem = async (req, res) => {
  const { resumeId, fieldName, index } = req.params;

  try {
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    if (!Array.isArray(resume[fieldName])) {
      return res.status(400).json({ error: `Field '${fieldName}' is not an array or doesn't exist` });
    }

    // Convert index to a number and check bounds
    const idx = parseInt(index);
    if (isNaN(idx) || idx < 0 || idx >= resume[fieldName].length) {
      return res.status(400).json({ error: `Invalid index for '${fieldName}'` });
    }

    // Remove the item at the index
    resume[fieldName].splice(idx, 1);

    const updatedResume = await resume.save();
    res.status(200).json(updatedResume);
  } catch (error) {
    console.error("Error deleting resume field item:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteResume = async (req, res) => {
  const { resumeId } = req.params;

  try {
    const resume = await Resume.findByIdAndDelete(resumeId);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ error: error.message });
  }
};
