import { optimizeResume } from "../Controllers/jdController.js";
import express from "express";

const router = express.Router();

// Route to optimize resume based on job description
router.post("/:userId/optimize-resume", optimizeResume);

export default router;
