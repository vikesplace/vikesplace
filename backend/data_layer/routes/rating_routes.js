import express from "express";
import { createRating, getAllRatings } from "../controllers/rating_controller.js";

const router = express.Router();

//Create a rating
router.post("/", createRating);

//Get all ratings for a listing
router.get("/:listingId", getAllRatings);

export default router;