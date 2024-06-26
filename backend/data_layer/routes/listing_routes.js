import express from "express";
import { getLongLat, getPostalCode } from "../controllers/location_controller.js";
import { createListing, getListingInfo, getSellerListings, updateListing, deleteListing, getSortedListings } from "../controllers/listing_controller.js";

const router = express.Router();

//Get sorted listings
router.get("/", getSortedListings);

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

//Get long and lat
router.get("/location/:postal_code", getLongLat);

//Get postal code
router.get("/location/:longitude/:latitude", getPostalCode);

export default router;