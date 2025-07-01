import express from "express";
const router = express.Router();

import multer from "multer";
const upload = multer();
import { storeHistory } from "../Controllers/resumeController.js";
import { getHistory } from "../Controllers/resumeController.js";
import { getHistoryById } from "../Controllers/resumeController.js";
import { deleteHistoryItem } from "../Controllers/resumeController.js";

router.post("/save-resume", upload.single("resumePdf"), storeHistory);
router.get("/:userId/history", getHistory);
router.get("/history/:id",getHistoryById);
router.delete("/historydelete/:id", deleteHistoryItem);

export default router;