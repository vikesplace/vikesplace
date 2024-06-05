import express from "express";

const router = express.Router();

// cution: middleware chain matches the route from top to buttom

//Get All Reviews for a Listing
router.get("/:listingId", (req, res) => {
  res.json({ message: "Get All Reviews" });
});

//Leave a Review for a Listing
router.post("/:listingId", (req, res) => {
  // Handle login logic
  // ...
  res.json({ message: "Leave Review" });
});

export default router;
