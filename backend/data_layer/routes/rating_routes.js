import express from "express";
import { createRating } from "../controllers/rating_controller.js";

const router = express.Router();

//Create a rating
router.post("/", createRating);

//Get all ratings for a listing
router.get("/:listingId", (req, res) => {
  res.json({ message: "Get All Ratings for a Listing" });
});

export default router;