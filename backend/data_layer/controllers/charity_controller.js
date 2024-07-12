import Charity from "../models/charity_models.js";

export const getAllCharities = async (req, res) => {
    try {        
        const charities = await Charity.findAll();
        res.json(charities);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }   
};