import express from "express";

const router = express.Router();

//Create a listing
router.post("/", (req, res) => {
  res.json({ message: "Create Listing" });
});

//Update a listing
router.patch("/:listingId", (req, res) => {
  res.json({ message: "Update Listing" });
});

//Delete a listing
router.delete("/:listingId", (req, res) => {
  res.json({ message: "Delete Listing" });
});

//Get sorted listings
router.get("/", (req, res) => {
  res.json({ message: "Get Sorted Listings" });
});

//Get a listing
router.get("/:listingId", (req, res) => {
  res.json({ message: "Get Listing" });
});

//Get all listings of a user
router.get("/:userId", (req, res) => {
  res.json({ message: "Get All Listings of a User" });
});

export default router;