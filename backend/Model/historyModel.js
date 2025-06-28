import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: String,
  companyName: String,
  jobDescription: String,
  resumePdf: Buffer, // store PDF as binary
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("History", historySchema);