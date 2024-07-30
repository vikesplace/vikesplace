import Listing from "../models/listing_models.js";
import PostalCodes from "../models/postal_code_models.js";
import Charity from "../models/charity_models.js";
import { Op } from "sequelize";

export const getSortedListings = async (req, res) => {
  const {
    minPrice,
    maxPrice,
    status,
    sortBy,
    isDescending,
    pullLimit,
    pageOffset,
  } = req.query;

  //build where object
  const where = {};
  if (!maxPrice) {
    where.price = {
      [Op.gte]: minPrice,
    };
  } else {
    where.price = {
      [Op.between]: [minPrice, maxPrice],
    };
  }
  if (status) {
    where.status = status;
  }

  //build order by array
  const order = [];
  if (sortBy === "createdOn" || sortBy === "created_on") {
    order.push(["listed_at", isDescending.toLowerCase() == "true" ? "DESC" : "ASC"]);
  }
  else if (sortBy) {
    order.push([sortBy, isDescending.toLowerCase() == "true" ? "DESC" : "ASC"]); //defaults to ascending
  }

  //build findAndCountAll options object
  const options = {
    where,
    order
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
    res.json(listings);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
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
    const coordinate = {
      type: "Point",
      coordinates: [req.body.lat_long.latitude, req.body.lat_long.longitude],
    };
    const location = req.body.location;
    if (!location.match(/^[A-Z0-9]+$/)) {
      return res
        .status(400)
        .json({ message: "Location must be uppercase and contain no spaces" });
    }
    const createResult = await Listing.create({
      seller_id: req.body.seller_id,
      title: req.body.title,
      price: req.body.price,
      lat_long: coordinate,
      location: location,
      status: "AVAILABLE",
      category: req.body.category,
      for_charity: req.body.forCharity,
    });
    const output = {
      listingId: createResult.listing_id,
      title: createResult.title,
      price: createResult.price,
      location: createResult.location,
      status: createResult.status,
      forCharity: createResult.for_charity,
    };
    res.json(output);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
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
      attributes: [
        ["seller_id", "sellerId"],
        ["listing_id", "listingId"],
        "location",
        "price",
        ["listed_at", "listedAt"],
        "status",
        "title",
        "lat_long",
        ["last_updated_at", "lastUpdatedAt"],
        ["for_charity", "forCharity"],
      ],
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
    const listing = await Listing.findOne({
      where: {
        listing_id: req.params.listingId,
      },
      attributes: [
        ["listing_id", "listingId"],
        ["seller_id", "sellerId"],
        "buyer_username",
        "title",
        "price",
        "location",
        "status",
        ["listed_at", "listedAt"],
        ["last_updated_at", "lastUpdatedAt"],
        "category",
        ["for_charity", "forCharity"],
      ],
    });
    if (!listing) {
      console.error("Listing not found");
      return res.status(500).send();
    }
    return res.status(200).json({
      sellerId: listing.dataValues.sellerId,
      listingId: listing.dataValues.listingId,
      title: listing.dataValues.title,
      price: listing.dataValues.price,
      location: listing.dataValues.location,
      status: listing.dataValues.status,
      listedAt: listing.dataValues.listedAt,
      lastupdatedAt: listing.dataValues.lastUpdatedAt,
      forCharity: listing.dataValues.forCharity,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};

export const updateListing = async (req, res) => {
  try {
    const updateFields = {};
    for (const key in req.body) {
      if (req.body[key] !== undefined) {
        updateFields[key] = req.body[key];
      }
    }

    const listing = await Listing.findByPk(req.params.listingId);
    if (!listing) {
      console.error("Listing not found");
      return res.status(500).send();
    }

    if (req.body.location) {
      const location = req.body.location;
      if (!location.match(/^[A-Z0-9]+$/)) {
        return res
          .status(400)
          .json({
            message: "Location must be uppercase and contain no spaces",
          });
      }
      if (listing.location !== req.body.location) {
        const lat_long = await PostalCodes.findOne({
          where: {
            postal_code: req.body.location,
          },
          attributes: ["latitude", "longitude"],
        });
        if (!lat_long) {
          console.error("Postal code not found");
          return res.status(500).send();
        }
        listing.lat_long = {
          type: "Point",
          coordinates: [lat_long.latitude, lat_long.longitude],
        };
        updateFields.lat_long = listing.lat_long;
      }
    }

    //transfer funds to charity if listing is sold and for charity
    if (
      listing.status != "SOLD" &&
      req.body.status === "SOLD" &&
      listing.for_charity == true
    ) {
      //find the charity whos end_date - month encapsulates the current date
      const charity = await Charity.findOne({
        where: {
          end_date: {
            [Op.gte]: new Date(),
            [Op.lte]: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          },
        },
      });
      if (!charity) {
        console.error("Charity not found");
        return res.status(500).send();
      }
      charity.fund = Number(charity.fund) + Number(req.body.price);
      charity.num_listings = charity.num_listings + 1;
      await charity.save();
    }

    const last_update_at = Date.now();
    updateFields.last_updated_at = last_update_at;

    await Listing.update(updateFields, {
      where: {
        listing_id: req.params.listingId,
      },
    });
    res.json({});
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
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
};
