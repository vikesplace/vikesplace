import express from "express";
import { createRating } from "../controllers/createRating.js";

const router = express.Router();

// cution: middleware chain matches the route from top to buttom

//Get All Ratings for a Listing
router.get("/:listingId", (req, res) => {
  res.json({ message: "Get All Ratings" });
});

//Leave a Rating for a Listing
router.post("/:listingId", createRating);

export default router;
