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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors
        .array()
        .map((err) => err.msg)
        .join(", "),
    });
  }

  const { token, newPassword } = req.body;

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const email = decodedToken.email;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    const response = await axios.put("/user/reset_password", {
      email,
      password: hashedPassword,
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default router;
