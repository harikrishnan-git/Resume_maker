import express from "express";
const router = express.Router();
import {
  createResume,
  getResumes,
  getResumeById,
} from "../Controllers/resumeController.js";

router.post("/user/:userId/create-resume", createResume);

router.get("/user/:userId/resume", getResumes);

router.get("/user/:userId/:resumeId", getResumeById);

export default router;
