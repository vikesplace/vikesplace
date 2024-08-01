import Charity from "../models/charity_models.js";
import { Op } from "sequelize";

export const getAllCharities = async (req, res) => {
    try {        
        const charities = await Charity.findAll(
            {attributes: [
                'name', 
                ["logo_url", "logoUrl"], 
                'status', 
                'fund', 
                ["end_date", "endDate"], 
                ["num_listings", "numListings"]
            ]}
        );
        if (!charities) {
            console.error("Charities not found");
            return res.status(500).send();
        }
        res.json(charities);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }   
};

export const createCharity = async (req, res) => {
    try {
        let start_date = null;
        const findStartDates = await Charity.findAll({
            where: {
                start_date: {[Op.gte]: new Date()},
            },
            attributes: ['start_date']
        });
        if (findStartDates.length === 0) {
            start_date = new Date();
        }
        else {
            start_date = findStartDates[findStartDates.length - 1].start_date;
            start_date.setMonth(start_date.getMonth());
        }
        const charityResult = await Charity.create({
            name: req.body.name,
            status: req.body.status,
            fund: 0,
            logo_url: String(Math.floor(Math.random() * 7) + 1),
            start_date: new Date(start_date.getFullYear(), start_date.getMonth() + 1, 1),
            end_date: new Date(start_date.getFullYear(), start_date.getMonth() + 1, start_date.getDate(), 23, 59, 59),
            num_listings: 0
        });
        res.json({});
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            console.error(error);
            res.status(400).json({ message: error.message });
        } else {
            console.error(error);
            res.status(500).send();
        }
    }
};