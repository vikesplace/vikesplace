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
      where: {
        seller_id: req.query.seller_id,
      },
    });
    res.json(listings);
  } catch (error) {
    res.json({ message: "Seller not found" });
  }
};
export const getListingInfo = async (req, res) => {
    try {
        const entry = await Listing.findByPk(req.params.listingId);
        const {listing_id, seller_id, buyer_username, title, price, location, status, listed_at, lastupdated_at, category} = entry;
        res.json({
            seller_id: seller_id,
            listing_id: listing_id,
            title: title,
            price: price,
            location: location,
            status: status,
            listed_at: listed_at,
            lastupdated_at: lastupdated_at
        });
    } catch (error) {
        res.json({
            message: "Unable to get listing with id: " + req.params.listingId
        });
    }
}
