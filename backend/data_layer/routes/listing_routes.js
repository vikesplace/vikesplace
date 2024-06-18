import express from "express";
import { createListing, updateListing } from "../controllers/listing_controller.js";

const router = express.Router();

//Get sorted listings
router.get("/", (req, res) => {
  res.json({ message: "Get Sorted Listings" });
});

//Get all listings of a user
router.get("/me", (req, res) => {
  res.json({ message: "Get All Listings of a User" });
});

//Create a listing
router.post("/", createListing);

//Update a listing
router.patch("/:listingId", updateListing);

//Delete a listing
router.delete("/:listingId", (req, res) => {
  res.json({ message: "Delete Listing" });
});

//Get a listing
router.get("/:listingId", (req, res) => {
  res.json({ message: "Get Listing" });
});

export default router;