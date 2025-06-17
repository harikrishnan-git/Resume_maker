const express = require("express");
const router = express.Router();
const { createResume, getResumes } = require("../Controllers/resumeController");

router.post("/user/:userId/create-resume", createResume);

router.get("/user/:userId/resume", getResumes);

module.exports = router;
