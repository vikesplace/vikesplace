import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import User from '../models/user_models.js';
import PostalCodes from "../models/postal_code_models.js";

export const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array().map(err => err.msg).join(', ') });
    }

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

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            location: { type: 'Point', coordinates: [longitude, latitude] },
            items_sold: items_sold || 0,
            items_bought: items_bought || 0
        });

        return res.status(201).json({
            userId: newUser.user_id,
            message: "User created successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Unable to create user"
        });
    }
};
