import express from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import 'dotenv/config';
import axios from 'axios';

const router = express.Router();
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
const jwtExpiry = '2h';

// Configuration for Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD
  }
});

// Validation rules
const usernameValidation = [
  check('username')
    .isLength({ min: 6, max: 20 }).withMessage('Username must be 6-20 characters long')
    .matches(/^[a-zA-Z0-9_@]+$/).withMessage('Username can only contain letters, numbers, "_" and "@"')
];

const passwordValidation = [
  check('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/).withMessage('Password must contain at least one special character')
];


// Endpoint to request account creation
router.post('/request_account', (req, res) => {
  const { email, callback } = req.body;

  if (!email.endsWith('@uvic.ca')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  const token = jwt.sign({ email }, jwtSecret, { expiresIn: jwtExpiry });
  const verificationLink = `${callback}${token}`;

  console.log("this is the token", token);

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Account Verification',
    text: `Please verify your Vikesplace account by clicking the following link: ${verificationLink}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Failed to send verification email' });
    }
    res.status(200).json({ message: 'Verification email sent successfully' });
  });
});

// Endpoint to verify account and create a new user
router.post("/verify_account", usernameValidation, passwordValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map(err => err.msg).join(', ') });
  }

  const { jwt: token, username, password, location } = req.body;

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const email = decoded.email;

    console.log(username, email, password, location, 'helloooooo')
    // const hashedPassword = await bcrypt.hash(password, 10);
    console.log("testing something" , await axios.post("/user",{
      username,
      email,
      password,
      location,
      items_sold: 0,
      items_bought: 0
    })
)
    // const newUser = await axios.post("/user",{
    //   username,
    //   email,
    //   password,
    //   location,
    //   items_sold: 0,
    //   items_bought: 0
    // });

    res.status(201).json();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default router;
