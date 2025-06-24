import express from "express";
const router = express.Router();
import {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResumeFieldItem,
  deleteResume,
  generatePDF,
} from "../Controllers/resumeController.js";

router.post("/user/:userId/create-resume", createResume);

router.get("/user/:userId/resume", getResumes);

router.get("/resume/:resumeId", getResumeById);

router.put("/resume/:resumeId/update", updateResume);

router.post("/generate-pdf", generatePDF);

router.delete(
  "/resume/:resumeId/field/:fieldName/:index",
  deleteResumeFieldItem
);

router.delete("/resume/:resumeId", deleteResume);

export default router;
