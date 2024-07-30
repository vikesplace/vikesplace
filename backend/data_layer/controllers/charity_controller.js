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
            status: "OPEN",
            fund: 0,
            logo_url: req.body.logo_url,
            start_date: new Date(),
            end_date: req.body.end_date,
            num_listings: 0
        })
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