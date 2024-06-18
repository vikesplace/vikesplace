import express from "express";
import {createListing} from "../controller/create_listing.js";
import {updateListing} from "../controller/update_listing.js";

const router = express.Router();


//Get sorted listings
router.get("/", (req, res) => {
  res.json({ message: "Get Sorted Listings" });
});

//Create a listing
router.post("/", createListing);

//Get all listings of a user
router.get("/me", (req, res) => {
  res.json({ message: "Get All Listings of a User" });
});

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