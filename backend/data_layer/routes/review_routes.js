import express from "express";
import { createReview } from "../controllers/review_controller.js";

const router = express.Router();

//Create a review
router.post("/:listingId", createReview);

//Get all reviews for a listing
router.get("/:listingId", (req, res) => {
  res.json({ message: "Get All Reviews for a Listing" });
});

export default router;