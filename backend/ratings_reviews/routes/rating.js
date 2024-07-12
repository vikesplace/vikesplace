import express from "express";
import { createRating } from "../controllers/createRating.js";
import { getAllRatings } from "../controller/get_all_ratings.js";

const router = express.Router();

//Leave a Rating for a Listing
router.post("/:listingId", createRating);

//Get all ratings for a listing
router.get("/:listingId", getAllRatings);

export default router;
