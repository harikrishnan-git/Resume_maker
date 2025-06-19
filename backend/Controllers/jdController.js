import userModel from "../Model/userModel.js";
import Resume from "../Model/resumeModel.js";

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

    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error optimizing resume:", error);
    res.status(500).json({ error: "Server error while optimizing resume" });
  }
};
