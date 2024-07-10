import express from "express";
import { createReview } from "../controllers/review_controller.js";
import { getAllReviews } from "../controllers/review_controller.js";

const router = express.Router();

// //Create a review
router.post("/", createReview);

//Get all reviews for a listing
router.get("/:listingId", getAllReviews);

export default router;