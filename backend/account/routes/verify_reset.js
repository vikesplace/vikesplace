import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import "dotenv/config";
import axios from "axios";

const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

const router = express.Router();

// Validation rules for the new password
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

// Endpoint to change the password of an existing user
router.post("/", passwordValidation, async (req, res) => {

  const { jwt: token, password } = req.body;
  console.log(password);
  if (!token) { 
    return res.status(400).json({ message: 'token is missing' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  const errors = validationResult(req);
  //console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors
        .array()
        .map((err) => err.msg)
        .join(", "),
    });
  } 

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const userEmail = decodedToken.email;
    //console.log(userEmail);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword); //To check if the updated password matches the database one, only for debugging
    // Update the user's password in the database
    const response = await axios.post("/user/resetPassword/", {
      email: userEmail,
      password: hashedPassword,
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    //console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

export default router;
