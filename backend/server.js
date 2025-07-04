import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./Routes/userRoutes.js";
import resumeRoutes from "./Routes/resumeRoutes.js";
import jdRoutes from "./Routes/jdRoutes.js";
import historyRoute from "./Routes/historyRoute.js";

const app = express();

//changes for deployment
import path from "path";
import { fileURLToPath } from "url";

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://resumemaker-production-61ec.up.railway.app",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
  })
); // allow React app to access API

app.use("/api/user", userRoutes);
app.use("/api", resumeRoutes);
app.use("/api/jd", jdRoutes);
app.use("/api", historyRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`connected to db and listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
