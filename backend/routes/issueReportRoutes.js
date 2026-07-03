import express from "express";

import {
  createIssueReport,
  getIssueReports
} from "../controllers/issueReportController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createIssueReport
);

router.get(
  "/:toiletId",
  getIssueReports
);

export default router;