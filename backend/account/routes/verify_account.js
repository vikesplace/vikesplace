import express from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import "dotenv/config";
import axios from "axios";

const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

const router = express.Router();

// Validation rules
const usernameValidation = [
  check("username")
    .isLength({ min: 6, max: 20 })
    .withMessage("Username must be 6-20 characters long")
    .matches(/^[a-zA-Z0-9_@]+$/)
    .withMessage('Username can only contain letters, numbers, "_" and "@"'),
];

const passwordValidation = [
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[^a-zA-Z0-9]/)
    .withMessage("Password must contain at least one special character"),
];

// Endpoint to verify account and create a new user
router.post("/", usernameValidation, passwordValidation, async (req, res) => {

  const { jwt: token, username, password, lat_long } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'jwt is required' });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors
        .array()
        .map((err) => err.msg)
        .join(", "),
    });
  }


  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await axios.post("/user", {
      username,
      email: res.locals.decodedToken.email,
      password: hashedPassword,
      lat_long,
      items_sold: 0,
      items_bought: 0,
    });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.data.user_id }, jwtSecret, {
      expiresIn: "2h",
    });

    // Set cookie with token
    res.cookie("Authorization", token, { httpOnly: true });
    res.status(201).json({ userId: newUser.data.user_id });
  } catch (error) {
    if (error.response) {
        console.error(error.response.data.message);
        return res.status(error.response.status).json({ message: error.response.data.message });
    } else {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Failed to create user' });
    }
  }
});

export default router;