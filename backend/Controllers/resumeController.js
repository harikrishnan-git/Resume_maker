const Resume = require('../Model/resumeModel')
const User = require('../Model/userModel'); 

// POST /api/user/:userId/resume
const createResume = async (req, res) => {
  const { userId } = req.params;
  const {
    name,
    email,
    address,
    careerObjective,
    skills,
    education,
    experience,
    referral,
    certifications,
    achievements,
    languages,
  } = req.body;

  try {
    // Optional: check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newResume = new Resume({
      user: userId,
      name,
      email,
      address,
      careerObjective,
      skills,
      education,
      experience,
      referral,
      certifications,
      achievements,
      languages, 
    });

    const savedResume = await newResume.save();

    res.status(201).json(savedResume);
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ error: 'Server error while creating resume' });
  }
};

module.exports = {createResume}
