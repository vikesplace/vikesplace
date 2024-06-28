import axios from 'axios';

export const createListing = async (req, res) => {
    let geoPointLocation = null;
    try{
        // get the lat,long geopoint of the provided postal code location
        const geoPoint = await axios.get(`/listing/location/${req.body.location}`);
        geoPointLocation = geoPoint.data;
        const response = await axios.post("/listing",{
                    title: req.body.title,
                    seller_id: seller_id,
                    price: req.body.price,
                    location: geoPointLocation,
                    postal_code: req.body.location,
                    category: req.body.category
                });
                res.json(response.data);
        
    } catch (geoError) {
        if (createError.response) {
            console.error(createError.response.data.error);
            return res.status(createError.response.status).json({ error: createError.response.data.error });
        } else {
            console.error('Error creating geopoint:', createError);
            return res.status(500).json({ error: 'Failed to create listing' });
        }
    }

    try {
        const seller_id = res.locals.decodedToken.userId;

        // create a new listing
        const response = await axios.post("/listing",{
            title: req.body.title,
            seller_id: seller_id,
            price: req.body.price,
            location: geoPointLocation,
            postal_code: req.body.location,
            category: req.body.category
        });
        return res.json(response.data);

    } catch (createError) {
        if (createError.response.data.error.includes("Validation error")) {
            console.error(createError.response.data.error);
            return res.status(createError.response.status).json({ error: createError.response.data.error });
        } else {
            console.error('Error creating listing:', createError);
            return res.status(500).json({ error: 'Failed to create listing' });
        }
    }
};