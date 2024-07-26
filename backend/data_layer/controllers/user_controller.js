import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import User from "../models/user_models.js";
import PostalCodes from "../models/postal_code_models.js";
import "dotenv/config";
import Listings from "../models/listing_models.js";
import { Sequelize } from "sequelize";

// JWT Secret
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

// Validation rules for login

export const createUser = async (req, res) => {
  const { username, email, password, location, items_sold, items_purchased } = req.body;

  if (!location.match(/^[A-Z0-9]+$/)) {
    return res.status(400).json({ message: 'Location must be uppercase and contain no spaces' });
  }

  try {
    // Fetch coordinates for the provided postal code
    const postalCodeRecord = await PostalCodes.findOne({
      where: { postal_code: location },
    });

    if (!postalCodeRecord) {
      return res.status(400).json({ message: "Invalid postal code" });
    }
    const { latitude, longitude } = postalCodeRecord;

    if (
      latitude === null ||
      longitude === null ||
      isNaN(latitude) ||
      isNaN(longitude)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid coordinates for the postal code" });
    }

    // Create the user
    const newUser = await User.create({
      username,
      email,
      password: password,
      lat_long: { type: "Point", coordinates: [longitude, latitude] },
      location: location,
      items_sold: items_sold || 0,
      items_purchased: items_purchased || 0,
    });

    return res.status(201).json({
      user_id: newUser.dataValues.user_id,
      message: "User created successfully",
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ message: "Validation error: " + error.message });
    } else if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ message: "Username or email already exists" });
    } else {
      res.status(500).json({ message: "Database error: " + error.message });
    }
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "User or password is incorrect" });
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "User or password is incorrect" });
    }
    return res
      .status(200)
      .json({ message: "User logged in successfully", user_id: user.user_id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserData = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: [
        "username",
        "location",
        ["joining_date", "joiningDate"],
        ["items_sold", "itemsSold"],
        ["items_purchased", "itemsPurchased"],
      ],
      where: { user_id: req.params.userId },
    });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const itemsSold = await Listings.findAll({
      attributes: [
        [Sequelize.literal('array_agg(listing_id)'), 'ids']
      ],
      where: { seller_id: req.params.userId, status: "SOLD"},
    });

    const itemsBought = await Listings.findAll({
      attributes: [
        [Sequelize.literal('array_agg(listing_id)'), 'ids']
      ],
      where: { buyer_username: user.dataValues.username },
    });

    return res.status(200).json({
      username: user.dataValues.username,
      location: user.dataValues.location,
      joiningDate: user.dataValues.joiningDate,
      itemsSold: itemsSold[0].dataValues.ids || [],
      itemsBought: itemsBought[0].dataValues.ids || [],
    });
  } catch (err) {
    res.json({ message: err });
  }
};

export const getUserMe = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: [
        ["user_id", "userId"],
        "username",
        "location",
        ["joining_date", "joiningDate"],
        ["items_sold", "itemsSold"],
        ["items_purchased", "itemsPurchased"],
        ["see_charity", "seeCharity"],
      ],
      where: { user_id: req.params.userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const itemsSold = await Listings.findAll({
      attributes: [
        [Sequelize.literal('array_agg(listing_id)'), 'ids']
      ],
      where: { seller_id: req.params.userId, status: "SOLD"},
    });
    const itemsBought = await Listings.findAll({
      attributes: [
        [Sequelize.literal('array_agg(listing_id)'), 'ids']
      ],
      where: { buyer_username: user.dataValues.username },
    });

    return res.status(200).json({
      userId: user.dataValues.userId,
      username: user.dataValues.username,
      location: user.dataValues.location,
      joiningDate: user.dataValues.joiningDate,
      itemsSold: itemsSold[0].dataValues.ids || [],
      itemsBought: itemsBought[0].dataValues.ids || [],
      seeCharity: user.dataValues.seeCharity,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  //console.log(req.body);

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //console.log(newPassword);
    //console.log(email);
    // Generate salt and hash the new password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = password;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserLatLong = async (req, res) => {
  try {
    const latLong = await User.findOne({
      attributes: ["lat_long"],
      where: { user_id: req.params.userId },
    });
    if (!latLong) {
      return res.status(404).json({ message: "User does not exist" });
    }
    return res.json(latLong.dataValues);
  } catch (err) {
    res.json({ message: err });
  }
};

export const updateUserData = async (req, res) => {
    try {
        const updateFields = {};
        for (const key in req.body) {
          if (req.body[key] !== undefined) {
            updateFields[key] = req.body[key];
          }
        }

        const coordinate = { type: 'Point', coordinates: [req.body.lat_long.latitude,req.body.lat_long.longitude]}
        const location = req.body.location;
        if (!location.match(/^[A-Z0-9]+$/)) {
          return res.status(400).json({ message: 'Location must be uppercase and contain no spaces' });
        }
        updateFields.lat_long = coordinate;

        const postalCodeRecord = await PostalCodes.findOne({
            where: { postal_code: req.body.location },
        });
        if (!postalCodeRecord) {
            return res.status(400).json({ message: "Invalid postal code" });
        }
        
        await User.update(updateFields, {
          where: {
            user_id: req.params.userId,
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