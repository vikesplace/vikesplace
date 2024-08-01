import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import { loginUser } from "../controllers/login_user.js";

const router = express.Router();

// Validation rules for login
const loginValidation = [
  check("username").not().isEmpty().withMessage("Username is required"),
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

router.post("/", loginValidation, loginUser);

export default router;
