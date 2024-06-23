import axios from 'axios';

export const getPostalCode = async (longitude, latitude) => {
    try {
        const response = await axios.get(`/listing/location/${longitude}/${latitude}`)
        return response.data;
    } 
    catch(err){
        console.log(err);
    }
}