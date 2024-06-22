import express, { application } from "express";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
const router = express.Router();
import 'dotenv/config'


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
router.post('/request_account', (req, res) => {

  const { email, callback } = req.body;
  // Validate email address
  if (!email.endsWith('@uvic.ca')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  // Create JWT token
  const token = jwt.sign({ email }, jwtSecret, { expiresIn: jwtExpiry });

  // Generate verification link
  const verificationLink = `${callback}${token}`;

  // Email options
  const mailOptions = {
    from: process.env.EMAIL, // Replace with your email
    to: email,
    subject: 'Account Verification',
    text: `Please verify your Vikesplace account by clicking the following link: ${verificationLink}`
  };

  // Send verification email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Failed to send verification email' });
    }
    res.status(200).json({ message: 'Verification email sent successfully' });
  });
});


router.post("/verify_account", (req, res) => {
  // handle verify account logic here
  res.json({ message: "user registered" });
});

export default router;
