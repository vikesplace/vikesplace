import express from 'express';
import { makeRecommendation } from '../controllers/recommendation_controller.js';

const router = express.Router();

//Get recommendations
router.get("/", makeRecommendation);

//Ignore a recommendation
router.patch("/:recommendationId", (req, res) => {
    res.json({ message: "Ignore Recommendation" });
});

export default router;