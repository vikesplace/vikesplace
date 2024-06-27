import express from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
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

router.post('/', (req, res) => {
  const { email, callback } = req.body;

  if(!email){
    return res.status(400).json({ message: 'Email is required' });
  }

  if (!email.endsWith('@uvic.ca')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  if (!callback) {
    return res.status(400).json({ message: 'Callback URL is required' });
  }

  const token = jwt.sign({ email }, jwtSecret, { expiresIn: jwtExpiry });
  console.log(token);
  const resetLink = `${callback}${token}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Password Reset Request',
    text: `Please reset your password by clicking the following link: ${resetLink}`
  };

  console.log('1');
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Failed to send reset email' });
    }
    res.status(200).json({ message: 'Reset email sent successfully' });
  });
});

export default router;
