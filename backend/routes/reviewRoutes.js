import express from "express";
import { addReview, getReviewsByToiletId} from "../controllers/reviewController.js";
import { createReviewValidation } from "../validations/reviewValidation.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

// router.post("/", addReview);
router.post(
  "/",
  createReviewValidation,
  validate,
  addReview
);
router.get("/:toiletId", getReviewsByToiletId);

export default router;