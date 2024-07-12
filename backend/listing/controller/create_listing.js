import axios from 'axios';

export const createListing = async (req, res) => {
    let geoPointLocation = null;
    const seller_id = res.locals.decodedToken.userId;
    try{
        // get the lat,long geopoint of the provided postal code location
        const geoPoint = await axios.get(`/listing/location/${req.body.location}`);
        geoPointLocation = geoPoint.data;
        
    } catch (geoError) {
        if (geoError.response) { // if bad request, return error to client
            return res.status(geoError.response.status).json({ message: geoError.response.data.message });
        } else { // if internal server error, log error and return message to client
            console.error('Error creating geopoint:', geoError); 
            return res.status(500).json({ message: 'Failed to create listing' }); 
        }
    }

    try {
        // create a new listing in the database
        const response = await axios.post("/listing",{
            title: req.body.title,
            seller_id: seller_id,
            price: req.body.price,
            lat_long: geoPointLocation,
            location: req.body.location,
            category: req.body.category,
            forCharity: req.body.forCharity
        });
        return res.json(response.data);

    } catch (createError) {
        if (createError.response && (createError.response.status == 400)) { // if bad request, return error to client
            return res.status(createError.response.status).json({ message: createError.response.data.message });
        } else { // if internal server error, log error and return message to client
            console.error('Error creating listing:', createError);
            return res.status(500).json({ message: "Error creating listing" });
        }
    }
};