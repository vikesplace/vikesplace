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

    getUserSearchHistory(id) {
        return axios.get(API_URL + 'users/' + {id} + '/searches', { 
            headers: authHeader()
        });
    }

    getReviews(id) {
        return axios.get(API_URL + 'review/' + {id}, { 
            headers: authHeader()
        });
    }

    getRatings(id) {
        return axios.get(API_URL + 'rating/' + {id}, { 
            headers: authHeader()
        });
    }

    createReview(id, reviewContent) {
        return axios.post(API_URL + 'review/' + {id}, { 
            headers: authHeader(),
            reviewContent
        });
    }

    createRating(id, ratingValue) {
        return axios.post(API_URL + 'rating/' + {id}, { 
            headers: authHeader(),
            ratingValue
        });
    }

    getRecommendations() {
        return axios.get(API_URL + 'recommendations', { 
            headers: authHeader()
        });
    }

    ignoreRecommendation(id) {
        return axios.post(API_URL + 'recommendations/' + {id} + '/ignore', { 
            headers: authHeader(),
            ignore: true
        });
    }

    getChats(id) {
        return axios.get(API_URL + 'chats', { 
            headers: authHeader(),
            id
        });
    }

    getChatMessages(id) {
        return axios.get(API_URL + 'messages/' + {id}, { 
            headers: authHeader(),
            id
        });
    }

    getChatInformation(id) {
        return axios.get(API_URL + 'chats/' + {id}, { 
            headers: authHeader(),
            id
        });
    }

    updateMessages() {
        //TODO modify to websocket
        return axios.post(API_URL + 'messages/updates', { 
            headers: authHeader()
        });
    }
}

export default DataService;