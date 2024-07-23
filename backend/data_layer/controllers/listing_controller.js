import Listing from "../models/listing_models.js";
import PostalCodes from "../models/postal_code_models.js";
import { Op } from "sequelize";

export const getSortedListings = async (req, res) => {
  const { minPrice, maxPrice, status, sortBy, isDescending, pullLimit, pageOffset } = req.query;

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
  if (sortBy) {
    order.push([sortBy, (isDescending.toLowerCase() == "true" ? "DESC" : "ASC")]); //defaults to ascending
  }

  //build findAndCountAll options object
  const options = {
    where, order, attributes: [
      ["seller_id", "sellerId"],
      ["listing_id", "listingId"],
      "location",
      "price",
      ["listed_at", "listedAt"],
      "status",
      "title",
      "lat_long",
      ["last_updated_at", "lastUpdatedAt"],
      ["for_charity", "forCharity"]
    ]
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
    const coordinate = { type: 'Point', coordinates: [req.body.lat_long.latitude, req.body.lat_long.longitude] }
    const createResult = await Listing.create({
      seller_id: req.body.seller_id,
      title: req.body.title,
      price: req.body.price,
      lat_long: coordinate,
      location: req.body.location,
      status: "AVAILABLE",
      category: req.body.category,
      for_charity: req.body.forCharity,
    });
    const output = {
      listingId: createResult.listing_id,
      title: createResult.title,
      price: createResult.price,
      location: createResult.location,
      status: createResult.status
    };
    res.json(output);
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
        ["for_charity", "forCharity"]
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
        ["for_charity", "forCharity"]
      ]
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
  };
};

export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.listingId);
    if (!listing) {
      console.error("Listing not found");
      return res.status(500).send();
    }
    if (req.body.location) {
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
        listing.lat_long = { type: 'Point', coordinates: [lat_long.latitude, lat_long.longitude] };
      }
    }
    await Listing.update({
      title: req.body.title,
      price: req.body.price,
      status: req.body.status,
      location: req.body.location,
      category: req.body.category,
      lat_long: listing.lat_long,
      buyer_username: req.body.buyer_username,
      for_charity: req.body.for_charity
    }, {
      where: {
        listing_id: req.params.listingId,
      }
    });
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