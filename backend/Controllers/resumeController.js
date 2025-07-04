import Resume from "../Model/resumeModel.js";
import User from "../Model/userModel.js";
import { chromium } from "playwright";
import History from "../Model/historyModel.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// POST /api/user/:userId/resume
export const createResume = async (req, res) => {
  const { userId } = req.params;
  const {
    type,
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
      type,
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

export const generatePDF = async (req, res) => {
  const { html } = req.body;

  try {
    const cssPath = path.join(__dirname, "../style/output.css");
    const css = await fs.readFile(cssPath, "utf-8");
    if (!css) {
      console.error("CSS file not found or empty on backend");
      return res.status(500).send("CSS file not found or empty on backend");
    }
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.setContent(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
          ${html}
        </body>
      </html>
    `,
      { waitUntil: "networkidle" }
    );

    await page.addStyleTag({ content: css });

    await page.evaluate(async () => {
      const links = Array.from(
        document.querySelectorAll('link[rel="stylesheet"]')
      );
      await Promise.all(
        links.map((link) => {
          if (link.sheet) return;
          return new Promise((resolve, reject) => {
            link.onload = resolve;
            link.onerror = reject;
          });
        })
      );
    });

    await page.waitForTimeout(1000);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        right: "20mm",
        bottom: "20mm",
        left: "20mm",
      },
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).send("PDF generation failed");
  }
};

export const updateResume = async (req, res) => {
  const { resumeId } = req.params;
  const {
    type,
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
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    resume.type = type || resume.type;
    resume.name = name || resume.name;
    resume.email = email || resume.email;
    resume.address = address || resume.address;
    resume.careerObjective = objective || resume.careerObjective;
    resume.skills = skills || resume.skills;
    resume.education = education || resume.education;
    resume.experience = experience || resume.experience;
    resume.projects = projects || resume.projects;
    resume.referral = referral || resume.referral;
    resume.certifications = certifications || resume.certifications;
    resume.achievements = achievements || resume.achievements;
    resume.publications = publications || resume.publications;
    resume.languages = languages || resume.languages;

    console.log("Updating resume with:", req.body);
    const updatedResume = await resume.save();
    res.status(200).json(updatedResume);
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({ error: error.message });
  }
};
export const deleteResumeFieldItem = async (req, res) => {
  const { resumeId, fieldName, index } = req.params;

  try {
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    if (!Array.isArray(resume[fieldName])) {
      return res.status(400).json({
        error: `Field '${fieldName}' is not an array or doesn't exist`,
      });
    }

    // Convert index to a number and check bounds
    const idx = parseInt(index);
    if (isNaN(idx) || idx < 0 || idx >= resume[fieldName].length) {
      return res
        .status(400)
        .json({ error: `Invalid index for '${fieldName}'` });
    }

    // Remove the item at the index
    resume[fieldName].splice(idx, 1);

    const updatedResume = await resume.save();
    res.status(200).json(updatedResume);
  } catch (error) {
    console.error("Error deleting resume field item:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteResume = async (req, res) => {
  const { resumeId } = req.params;

  try {
    const resume = await Resume.findByIdAndDelete(resumeId);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ error: error.message });
  }
};

export const storeHistory = async (req, res) => {
  const { userId, companyName, jobDescription } = req.body;
  const resumePdfBuffer = req.file.buffer;

  try {
    await History.create({
      userId,
      companyName,
      jobDescription,
      resumePdf: resumePdfBuffer, // save as Buffer
      createdAt: new Date(),
    });

    res.status(200).json({ message: "Resume saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving resume" });
  }
};

export const getHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const history = await History.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Server error while fetching history" });
  }
}

export const getHistoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const historyItem = await History.findById(id);
    if (!historyItem) {
      return res.status(404).json({ error: "History item not found" });
    }
    res.status(200).json(historyItem);
  } catch (error) {
    console.error("Error fetching history item:", error);
    res.status(500).json({ error: "Server error while fetching history item" });
  }
}

export const deleteHistoryItem = async (req, res) => {
  const { id } = req.params;

  try {
    const historyItem = await History.findByIdAndDelete(id);
    if (!historyItem) {
      return res.status(404).json({ error: "History item not found" });
    }
    res.status(200).json({ message: "History item deleted successfully" });
  } catch (error) {
    console.error("Error deleting history item:", error);
    res.status(500).json({ error: "Server error while deleting history item" });
  }
}
