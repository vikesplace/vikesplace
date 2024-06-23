import axios from 'axios';

//this method should be called when user is creating their account and entering their postal code
//so that in the database, we can store the long and lat of the postal code associate with the user
export const getLongLat = async (postal_code, user_id) => {
    try {
        const response = await axios.get(`/listing/location/${postal_code}/${user_id}`);
        return response.data;
    } 
    catch(err){
        console.log(err);
    }
}