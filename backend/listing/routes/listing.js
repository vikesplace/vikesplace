import express from "express";
import {createListing} from "../controller/create_listing.js";
import {deleteListing} from "../controller/delete_listing.js";
import {updateListing} from "../controller/update_listing.js";
import { getSellerListings } from "../controller/get_seller_listings.js";
<<<<<<< be-id-223
=======
import { getSortedListings } from "../controller/get_sorted_listings.js";

>>>>>>> main
import {getListingInfo} from "../controller/get_listing.js";
const router = express.Router();


//Get sorted listings
router.get("/", getSortedListings);

//Create a listing
router.post("/", createListing);

//Get all listings of a user
router.get("/me", getSellerListings);

//Update a listing
router.patch("/:listingId", updateListing);

//Delete a listing
router.delete("/:listingId", deleteListing);

//Get a listing
router.get("/:listingId", getListingInfo);



export default router;