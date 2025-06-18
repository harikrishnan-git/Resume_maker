// backend/models/Resume.js
import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  year: String,
  cgpa: Number,
});

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  duration: String,
});

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: String,

  careerObjective: String,

  skills: [String],

  education: [educationSchema],

  experience: [experienceSchema],

  referral: [String],

  certifications: [String],

  achievements: [String],

  languages: [String],
});

export default mongoose.model("Resume", resumeSchema);
