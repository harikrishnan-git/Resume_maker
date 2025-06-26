import dotenv from "dotenv";
dotenv.config();
import userModel from "../Model/userModel.js";
import Resume from "../Model/resumeModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export const optimizeResume = async (req, res) => {
  const { userId } = req.params;
  const { jd, type } = req.body;

  try {
    // Fetch user details
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch resumes for the user
    const resumes = await Resume.find({ user: userId, type: type }).populate(
      "user",
      "name email"
    );

    if (resumes.length === 0) {
      return res
        .status(404)
        .json({ error: "No resumes found for this user of given type" });
    }

    // combining all the resumes
    const allResumes = resumes.map((r) => r.toObject());
    const combinedResumeText = allResumes
      .map((r, i) => `---Resume${i + 1})---\n${JSON.stringify(r, null, 2)}`)
      .join("\n\n");

    //prompt
    const prompt = `You are a resume optimization expert. You are given:

1. A job description (JD)
2. Multiple resume versions for a single user (combinedResumeText)

Your task is to generate a **single optimized resume** in **valid JSON format** that best matches the JD.

### Instructions:
- Extract only the **most relevant and strongest**:
  - Skills that match or are closely related to the JD
  - Experiences that demonstrate qualifications for the JD
  - Education that supports the JD requirements
  - Always include referrals
- You must **filter out unrelated or redundant content**.
- Prioritize modern, action-driven, and concise descriptions.
- Summarize with a clear, focused "summary" field tailored to the JD.

    No markdown, no explanations required. Return only as JSON object and resume should be atmost 1 page long.

    ${jd}
    ${combinedResumeText}`;

    //generating response of gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const rawText = result.response.text().trim();

    //cleaning the rawText
    const cleanText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/, "")
      .trim();

    let optimizedResume;
    try {
      optimizedResume = JSON.parse(cleanText);
    } catch (err) {
      console.error("Failed to parse gemini output.", cleanText);
      return res.status(500).json({
        error: "Gemini response is not valid JSON",
        rawResponse: cleanText,
      });
    }


    return res.status(200).json({ optimizedResume });
  } catch (error) {
    console.error("Error optimizing resume:", error);
    res.status(500).json({ error: "Server error while optimizing resume" });
  }
};

export const lackingSkills = async (req, res) => {
  const { jd, resumeSkills } = req.body;

  try {
    const prompt = `
You are an expert in resume optimization. Given the following job description and the resume's existing skills, identify the skills that are mentioned in the job description but are NOT present in the resume.
Omit soft skills and focus on technical and hard skills.

### Job Description:
${jd}

### Resume Skills:
${resumeSkills.join(", ")}

### Output format:
Return only the missing skills as a comma-separated list.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const rawText = result.response.text().trim();

    const cleanText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/, "")
      .trim();

    return res.status(200).json({ lackingSkills: cleanText });
  } catch (error) {
    console.error("Error analyzing lacking skills:", error);
    res.status(500).json({ error: "Server error while analyzing skills" });
  }
};
