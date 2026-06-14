import express from "express";
import { addToilet, getNearbyToilets } from "../controllers/toiletController.js";

const router = express.Router();

router.post("/", addToilet);
router.get("/nearby", getNearbyToilets);

export default router;