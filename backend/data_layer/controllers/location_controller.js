import PostalCodes from "../models/postal_code_models.js";

export const getLongLat = async (req, res) => {
    try {
        const postal_code = req.params.postal_code;
        const find_postal_code = await PostalCodes.findOne({
            where: { postal_code }
        });

        if(!find_postal_code) {
            return res.json({
                message: "Invalid input data"
            }); 
        }
        res.json({
            longitude: find_postal_code.longitude,
            latitude: find_postal_code.latitude,
        });
    } catch (error) {
        res.json({
            message: "Invalid input data"
        });
    }
}

export const getPostalCode = async (req, res) => {
    try {
        const longitude = req.params.longitude;
        const latitude = req.params.latitude;
        const find_postal_code = await PostalCodes.findOne({
            where: { longitude, latitude }
        });

        if(!find_postal_code) {
            return res.json({
                message: "Invalid input data"
            }); 
        }

        res.json({
            postal_code: find_postal_code.postal_code
        });
    } catch (error) {
        res.json({
            message: "Invalid input data"
        });
    }
}