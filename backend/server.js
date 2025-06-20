import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./Routes/userRoutes.js";
import resumeRoutes from "./Routes/resumeRoutes.js";
import jdRoutes from "./Routes/jdRoutes.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // allow React app to access API

app.use("/api/user", userRoutes);
app.use("/api", resumeRoutes);
app.use("/api", jdRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
