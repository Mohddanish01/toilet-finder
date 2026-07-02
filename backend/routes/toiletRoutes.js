import express from "express";
import { addToilet, getNearbyToilets, getToiletById, getAllToilets, updateToilet} from "../controllers/toiletController.js";
import { createToiletValidation } from "../validations/toiletValidation.js";
import { validate } from "../middlewares/validate.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

// router.post("/", addToilet);
router.post(
  "/",
  protect,
  createToiletValidation,
  validate,
  addToilet
);
router.get("/", getAllToilets);
router.get("/nearby", getNearbyToilets);
router.put("/:id", protect, updateToilet);
router.get("/:id", getToiletById);


export default router;