import express from 'express';
import { getRecommendations } from '../controllers/recommendation_controller.js';

const router = express.Router();

//Get recommendations
router.get("/", getRecommendations);

//Ignore a recommendation
router.patch("/:recommendationId", (req, res) => {
    res.json({ message: "Ignore Recommendation" });
});

export default router;