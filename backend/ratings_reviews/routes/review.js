import express from "express";
import { getAllReviews } from "../controller/get_all_reviews.js";

const router = express.Router();

//Get All Reviews for a Listing
router.get("/:listingId", getAllReviews);

// //Leave a Review for a Listing
// router.post("/:listingId", (req, res) => {
//   // Handle login logic
//   // ...
//   res.json({ message: "Leave Review" });
// });

export default router;
