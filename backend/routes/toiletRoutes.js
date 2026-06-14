import express from "express";
import { addToilet, getNearbyToilets, getToiletById, getAllToilets} from "../controllers/toiletController.js";

const router = express.Router();

router.post("/", addToilet);
router.get("/", getAllToilets);
router.get("/nearby", getNearbyToilets);
router.get("/:id", getToiletById);


export default router;