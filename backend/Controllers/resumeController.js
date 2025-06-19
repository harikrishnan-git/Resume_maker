import Resume from "../Model/resumeModel.js";
import User from "../Model/userModel.js";

// POST /api/user/:userId/resume
export const createResume = async (req, res) => {
  const { userId } = req.params;
  const {
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
