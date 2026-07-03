import express from "express";
import { addToilet, getNearbyToilets, getToiletById, getAllToilets, updateToilet, deleteToilet} from "../controllers/toiletController.js";
import { createToiletValidation } from "../validations/toiletValidation.js";
import { validate } from "../middlewares/validate.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

// router.post("/", addToilet);
router.post(
  "/",
  protect,
  upload.array("images", 5),
  createToiletValidation,
  validate,
  addToilet
);
router.get("/", getAllToilets);
router.get("/nearby", getNearbyToilets);
router.put("/:id", protect, updateToilet);
router.delete("/:id", protect, deleteToilet);
router.get("/:id", getToiletById);


export default router;