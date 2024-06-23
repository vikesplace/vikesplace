import axios from 'axios';

export const getLongLat = async (postal_code) => {
    try {
        const response = await axios.get(`/listing/location/${postal_code}`)
        return response.data;
    } 
    catch(err){
        console.log(err);
    }
}