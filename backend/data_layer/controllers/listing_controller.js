import Listing from "../models/listing_models.js";

export const createListing = async (req, res) => {
  try {
    const createResult = await Listing.create({
      seller_id: req.body.seller_id,
      title: req.body.title,
      price: req.body.price,
      location: req.body.location,
      status: "AVAILABLE",
      category: req.body.category,
    });
    res.json(createResult.dataValues.listing_id);
  } catch (error) {
    res.json({
      message: "Invalid input data",
    });
  }
};

export const getSellerListings = async (req, res) => {
  try {
    const listings = await Listing.findAll({
      attributes: ["listing_id"],
      where: {
        seller_id: req.body.seller_id,
      },
    });
    res.json(listings);
  } catch (error) {
    res.json({ message: "Seller not found" });
  }
};
