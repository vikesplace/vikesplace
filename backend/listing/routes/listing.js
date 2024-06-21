import express from "express";
import {createListing} from "../controller/create_listing.js";
import { getSellerListings } from "../controller/get_seller_listings.js";

const router = express.Router();


//Get sorted listings
router.get("/", (req, res) => {
  res.json({ message: "Get Sorted Listings" });
});

//Create a listing
router.post("/", createListing);

//Get all listings of a user
router.get("/me", getSellerListings);

//Update a listing
router.patch("/:listingId", (req, res) => {
  res.json({ message: "Update Listing" });
});

//Delete a listing
router.delete("/:listingId", (req, res) => {
  res.json({ message: "Delete Listing" });
});

//Get a listing
router.get("/:listingId", (req, res) => {
  res.json({ message: "Get Listing" });
});



export default router;