import Listing from "../models/listing_models.js";
import { Op } from "sequelize";

export const getSortedListings = async (req, res) => {
  const {minPrice, maxPrice, status, sortBy, isDescending, pullLimit, pageOffset} = req.query;

  //build where object
  const where = {};
  if ((minPrice && maxPrice) && (minPrice <= maxPrice)) {
    where.price = {
      [Op.between]: [minPrice, maxPrice],
    };
  }
  else if ((minPrice || maxPrice)) {
    console.error("Invalid price range specified");
    return res.status(400).json({ message: "Invalid price range specified" });
  }
  if (status) {
    where.status = status;
  }
  
  //build order by array
  const order = [];
  if (sortBy) {
    order.push([sortBy, (isDescending.toLowerCase()=="true" ? "DESC" : "ASC")]); //defaults to ascending
  }

  //build findAndCountAll options object
  const options = {where, order};

  //add limit and offset if they exist
  if (pullLimit) {
    options.limit = pullLimit;
  }
  if (pageOffset) {
    options.offset = pageOffset;
  }

  try {
    const listings = await Listing.findAndCountAll(options);
    res.json(listings); 
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      console.error(error);
      res.status(400).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).send();
    }
  }
};

export const createListing = async (req, res) => {
  try {
    const coordinate = { type: 'Point', coordinates: [req.body.lat_long.latitude,req.body.lat_long.longitude]}
    const createResult = await Listing.create({
      seller_id: req.body.seller_id,
      title: req.body.title,
      price: req.body.price,
      lat_long: coordinate,
      location: req.body.location,
      status: "AVAILABLE",
      category: req.body.category,
    });
    res.json(createResult.dataValues.listing_id);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      console.error(error);
      res.status(400).json({ message: error.message });
    } else { 
      console.error(error);
      res.status(500).send();
    }
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
    console.error(error);
    return res.status(500).send();
  }
};

export const getListingInfo = async (req, res) => {
    try {
        const listing = await Listing.findByPk(req.params.listingId);
        if (!listing) {
          console.error("Listing not found");
          return res.status(500).send();
        }
        const {listing_id, seller_id, buyer_username, title, price, location, status, listed_at, lastupdated_at, category} = listing;
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
        console.error(error);
        return res.status(500).send();
    };
};

export const updateListing = async (req, res) => {
    try {
        const listing = await Listing.findByPk(req.params.listingId);
        if (!listing) {
          console.error("Listing not found");
          return res.status(500).send();
        }
        listing.title = req.body.title;
        listing.price = req.body.price;
        listing.status = req.body.status;
        listing.lat_long = req.body.lat_long;
        listing.category = req.body.category;
        listing.location = req.body.location;
        listing.buyer_username = req.body.buyer_username; 
        await listing.save();
        res.json({});
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).send();
      }
    }
};

export const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findByPk(req.params.listingId);
        if (!listing) {
          console.error("Listing not found");
          return res.status(500).send();
        }
        listing.status = "REMOVED";
        await listing.save();
        res.json({});
    } catch (error) {
      console.error(error);
      return res.status(500).send();
    }
}