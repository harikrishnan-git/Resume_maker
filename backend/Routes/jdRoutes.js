import { optimizeResume } from "../Controllers/jdController.js";
import { lackingSkills } from "../Controllers/jdController.js";
import express from "express";

const router = express.Router();

// Route to optimize resume based on job description
<<<<<<< HEAD
router.post("/:userId/optimize-resume", optimizeResume);
router.post("/:userId/lacking-skills", lackingSkills);

=======
router.post("/user/:userId/optimize-resume", optimizeResume);
>>>>>>> 1caf15d (Live editing added)

export default router;
