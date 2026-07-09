import express from "express";

import {
  createDemand,
  getAllDemands,
  voteDemand,
  getMyDemands,
  deleteDemand
} from "../controllers/demandController.js";

import { protect }
from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createDemand
);

router.get(
  "/",
  getAllDemands
);

router.post(
  "/:id/vote",
  protect,
  voteDemand
);

router.get(
  "/my",
  protect,
  getMyDemands
);

router.delete(
  "/:id",
  protect,
  deleteDemand
);

export default router;