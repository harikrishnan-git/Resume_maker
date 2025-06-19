// backend/models/Resume.js
import mongoose from "mongoose";
import { type } from "os";

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

const projectSchema = new mongoose.Schema({
  title: String,
  tech: String,
  description: String,
});

const resumeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
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

  projects: [projectSchema],

  referral: [String],

  certifications: [String],

  achievements: [String],

  publications: [String],

  languages: [String],
});

export default mongoose.model("Resume", resumeSchema);
