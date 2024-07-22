import Charity from "../models/charity_models.js";

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
        const charityResult = await Charity.create({
            name: req.body.name,
            status: req.body.status,
            fund: req.body.fund,
            logo_url: req.body.logo_url,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            num_listings: req.body.num_listings
        })
        res.json(charityResult.dataValues);
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