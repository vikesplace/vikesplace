import axios from 'axios';
import authHeader from './AuthHeaderHelper';

const API_URL = 'http://localhost:8080/api/test/'; //TODO update to backend's url

class DataService {
    createListing(title, price, location, status, category) {
        return axios.post(API_URL + 'listings', { 
            headers: authHeader(), 
            title, 
            price, 
            location, 
            status, 
            category
        });
    }

    updateListing(id, title, price, location, status, buyerUsername, category) {
        return axios.patch(API_URL + 'listings/' + {id}, { 
            headers: authHeader(), 
            title, 
            price, 
            location, 
            status, 
            buyerUsername,
            category
        });
    }

    deleteListing(id) {
        return axios.delete(API_URL + 'listings/' + {id}, { 
            headers: authHeader()
        });
    }

    getSortedListings(minPrice, maxPrice, status, sortBy, isDescending) {
        return axios.get(API_URL + 'listings', { 
            headers: authHeader(),
            minPrice, 
            maxPrice, 
            status,
            sortBy,
            isDescending
        });
    }

    getListing(id) {
        return axios.get(API_URL + 'listings/' + {id}, { 
            headers: authHeader()
        });
    }

    getSellerListings() {
        return axios.get(API_URL + 'listings/me', { 
            headers: authHeader()
        });
    }

}

export default new DataService();