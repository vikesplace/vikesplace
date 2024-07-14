import axios from 'axios';
import httpErrorHandler from './httpErrorHandler';

const API_URL = 'http://localhost:8080/';

class DataService {
    async createListing(title, price, location, category, forCharity) {
        try {
            return await axios.post(API_URL + 'listings', {
                title,
                price,
                location,
                category,
                forCharity
            }, { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    updateListing(id, title, price, location, status, buyerUsername, category) {
        return axios.patch(API_URL + 'listings/' + id, {
            title,
            price,
            location,
            status,
            buyerUsername,
            category
        }, {withCredentials: true})
        .catch(httpErrorHandler);
    }

    deleteListing(id) {
        return axios.delete(API_URL + 'listings/' + id, 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getSortedListings(minPrice, maxPrice, status, sortBy, isDescending, pullLimit, pageLimit) {
        return axios.get(API_URL + 'listings', {
            minPrice,
            maxPrice,
            status,
            sortBy,
            isDescending,
            // pullLimit,
            // pageLimit
        }, {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getListing(id) {
        return axios.get(API_URL + 'listings/' + id, 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    async getSellerListings() {
        try {
            return await axios.get(API_URL + 'listings/me',
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    updateUserData(id, location) {
        return axios.patch(API_URL + 'users/' + id, {
            location
        }, {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getMyUserData() {
        return axios.get(API_URL + 'users/me', 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getUserData(id) {
        return axios.get(API_URL + 'users/' + id, 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getUserSearchHistory(id) {
        return axios.get(API_URL + 'users/' + id + '/searches', 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    search(query) {
        return axios.get(API_URL + 'search?query=' + { query }, 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getReviews(id) {
        return axios.get(API_URL + 'review/' + id, 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getRatings(id) {
        return axios.get(API_URL + 'rating/' + id, 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    createReview(id, reviewContent) {
        return axios.post(API_URL + 'review/' + id, {
            reviewContent
        }, {withCredentials: true})
        .catch(httpErrorHandler);
    }

    createRating(id, ratingValue) {
        return axios.post(API_URL + 'rating/' + id, {
            ratingValue
        }, {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getRecommendations() {
        return axios.get(API_URL + 'recommendations', 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    ignoreRecommendation(id) {
        return axios.post(API_URL + 'recommendations/' + id + '/ignore', {
            ignore: true
        }, {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getChats(id) {
        return axios.get(API_URL + 'chats', {
            id
        }, {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getChatMessages(id) {
        return axios.get(API_URL + 'messages/' + id, {
            id
        }, {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getChatInformation(id) {
        return axios.get(API_URL + 'chats/' + id, {
            id
        }, {withCredentials: true})
        .catch(httpErrorHandler);

    }

    sendMessage(message) {
        return axios.post(API_URL + 'messages/updates', {
            message
        }, {withCredentials: true})
        .catch(httpErrorHandler);
    }
}

export default DataService;