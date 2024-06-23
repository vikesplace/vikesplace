import axios from 'axios';

//this method should be used to return the postal code of the user back to the frontend once the long and lat is stored in the database
export const getPostalCode = async (longitude, latitude, user_id) => {
    try {
        const response = await axios.get(`/listing/location/${longitude}/${latitude}/${user_id}`);
        return response.data;
    } 
    catch(err){
        console.log(err);
    }
}