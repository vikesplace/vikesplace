import express from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { check, validationResult } from "express-validator";
import 'dotenv/config';

const router = express.Router();
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
const jwtExpiry = 900000;

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


// Endpoint to request account creation
router.post('/', (req, res) => {
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

export default router;
