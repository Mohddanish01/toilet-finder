import express from "express";
import { addReview, getReviewsByToiletId} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", addReview);
router.get("/:toiletId", getReviewsByToiletId);

export default router;