import express from "express";
const router = express.Router();
import { createResume, getResumes } from "../Controllers/resumeController.js";

router.post("/user/:userId/create-resume", createResume);

router.get("/user/:userId/resume", getResumes);

export default router;
