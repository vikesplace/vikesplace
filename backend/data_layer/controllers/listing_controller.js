import Listing from "../models/listing_models.js";
import { Op } from "sequelize";

export const getSortedListings = async (req, res) => {
  console.log('Full URL:', req.url);
  const {minPrice, maxPrice, status, sortBy, isDescending, pullLimit, pageOffset} = req.query;
  console.log('minPrice:', minPrice);
  console.log('maxPrice:', maxPrice);

  //build where object
  const where = {};
  if (minPrice && maxPrice) {
    where.price = {
      [Op.between]: [minPrice, maxPrice],
    };
  }
  //check if either maxPrice or minPrice is specified, but not both
  else if ((minPrice || maxPrice) && !(minPrice && maxPrice)) { //XOR
    //throw error
    res.json({
      message: "Invalid price range specified"
    });
  }
  if (status) { // either AVAILABLE, SOLD, or REMOVED
    where.status = status;
  }
  
  //build order array
  const order = [];
  if (sortBy) {

    //assuming that the listed_at column is easily sortable

    //assuming frontend will pass in a string that matches the column name

    order.push([sortBy, isDescending ? "DESC" : "ASC"]); //default to ascending
  }

  //build options object
  const options = {
    where: where,
    order: order,
  };

  //add limit and offset if they exist
  if (pullLimit) {
    options.limit = pullLimit;
  }
  if (pageOffset) {
    options.offset = pageOffset;
  }

  try {
    const listings = await Listing.findAndCountAll(options);
    console.log(listings);
    res.json(listings);
  } catch (error) {
    console.log('Error during database query:', error);
    res.status(500).json({
      message: "Invalid input data",
      error: error.message
    });
  }
}

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
    };
};

export const updateListing = async (req, res) => {
    try {
        const listing = await Listing.findByPk(req.params.listing_id);
        if (!listing) {
            return res.json({
                message: "Invalid input data"
            });
        }
        listing.title = req.body.title;
        listing.price = req.body.price;
        listing.status = req.body.status;
        listing.location = req.body.location;
        listing.category = req.body.category;
        await listing.save();
        res.json({});
    } catch (error) {
      res.json({
        message: "Invalid input data"
    });
    }
};

export const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findByPk(req.params.listing_id);
        if (!listing) {
            return res.json({
                message: "Invalid input data"
            });
        }
        listing.status = "REMOVED";
        await listing.save();
        res.json({});
    } catch (error) {
      res.json({
        message: "Invalid input data"
     });
    }
}