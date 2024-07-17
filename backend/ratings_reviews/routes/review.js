import express from "express";
import { createReview } from "../controller/create_review.js";
import { getAllReviews } from "../controller/get_all_reviews.js";

const router = express.Router();

//Get All Reviews for a Listing
router.get("/:listingId", getAllReviews);

//Leave a Review for a Listing
router.post("/:listingId", createReview);

export default router;
