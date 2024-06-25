import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import User from '../models/user_models.js';
import PostalCodes from "../models/postal_code_models.js";
import 'dotenv/config';

// JWT Secret
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

// Validation rules for login

export const createUser = async (req, res) => {

    const { username, email, password, location, items_sold, items_bought } = req.body;

    try {
        // Fetch coordinates for the provided postal code
        const postalCodeRecord = await PostalCodes.findOne({ where: { postal_code: location } });

        if (!postalCodeRecord) {
            return res.status(400).json({ message: "Invalid postal code" });
        }

        const { latitude, longitude } = postalCodeRecord;
        
        if (latitude === null || longitude === null || isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ message: "Invalid coordinates for the postal code" });
        }

        // Create the user
        const newUser = await User.create({
            username,
            email,
            password: password,
            location: { type: 'Point', coordinates: [longitude, latitude] },
            items_sold: items_sold || 0,
            items_bought: items_bought || 0
        });

        return res.status(201).json({
            user_id: newUser.dataValues.user_id,
            message: "User created successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Unable to create user"
        });
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

        return res.status(200).json({ message: "User logged in successfully", user_id:user.user_id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate salt and hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
