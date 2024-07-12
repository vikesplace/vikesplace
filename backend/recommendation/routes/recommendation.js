import express from "express";
import { ignoreRecommendation } from "../controller/ignore_recommendation.js";

const router = express.Router();

//Get recommendations
router.get("/", (req, res) => {
  res.json({ message: "Get Recommendations" });
});

//Ignore recommendation
router.post("/:listingId/ignore", ignoreRecommendation);

export default router;