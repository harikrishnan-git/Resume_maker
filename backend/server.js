require("dotenv").config(); //load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const resumeRoutes = require("./Routes/resumeRoutes");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // allow React app to access API

app.use("/api/user", userRoutes);
app.use("/api", resumeRoutes);

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
