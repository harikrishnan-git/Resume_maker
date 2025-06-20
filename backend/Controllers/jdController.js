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

    // Here you would implement the logic to optimize the resumes based on the job description (jd)

    // combining all the resumes
    const allResumes = resumes.map((r) => r.toObject());
    const combinedResumeText = allResumes
      .map((r, i) => `---Resume${i + 1})---\n${JSON.stringify(r, null, 2)}`)
      .join("\n\n");

    //prompt
    const prompt = `you are a resume expert.Given multiple resume versions for a user and a job description(JD), generate a single optimized resume that best matches the job.
    
    -Extract and merge the strongest and most revelent skills ,experience and education sections from all resumes.
    -Align the resume with the JD.
    -Be conscise,focused and modern in formating.
    - Return only valid JSON with fields:
    name, email, phone, summary, skills, experience, education, certifications, projects

    No markdown, no explanations required.

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
