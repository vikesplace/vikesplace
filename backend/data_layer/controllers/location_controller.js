import PostalCodes from "../models/postal_code_models.js";
import Users from "../models/user_models.js";

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

        const user_id = req.params.user_id;

        console.log(user_id);

        const find_user_id = await Users.findOne({
            where: { user_id }
        });

        if(!find_user_id) {
            return res.json({
                message: "Invalid input data"
            }); 
        }

        await Users.update({
            postal_code: postal_code,
            location:
            {
                type: "Point",
                coordinates: [find_postal_code.longitude, find_postal_code.latitude]
            }
        }, {
            where: { user_id }   
        });


        res.json({
            longitude: find_postal_code.longitude,
            latitude: find_postal_code.latitude,
            user_id: find_user_id.user_id,
            postal_code: postal_code
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