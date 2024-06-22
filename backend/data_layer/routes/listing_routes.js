import express from "express";
import { createListing, getListingInfo, getSellerListings, updateListing, deleteListing } from "../controllers/listing_controller.js";

const router = express.Router();

//Get sorted listings
router.get("/", (req, res) => {
  res.json({ message: "Get Sorted Listings" });
});

//Get all listings of a user
router.get("/me", getSellerListings);

//Create a listing
router.post("/", createListing);

//Update a listing
router.patch("/:listingId", updateListing);

//Delete a listing
router.delete("/:listingId", deleteListing);

//Get a listing
router.get("/:listingId", getListingInfo);

export default router;