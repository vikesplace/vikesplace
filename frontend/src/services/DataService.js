import axios from 'axios';
import httpErrorHandler from './httpErrorHandler';

const API_URL = 'http://localhost:8080/';

class DataService {
    createListing(title, price, location, category, forCharity) {
        axios.post(API_URL + 'listings', {
            title,
            price,
            location,
            category,
            forCharity
        }, {withCredentials: true})
        .catch(httpErrorHandler);
    }

    updateListing(id, title, price, location, status, buyerUsername, category) {
        axios.patch(API_URL + 'listings/' + { id }, {
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
        axios.delete(API_URL + 'listings/' + { id }, 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getSortedListings(minPrice, maxPrice, status, sortBy, isDescending, pullLimit, pageLimit) {
        axios.get(API_URL + 'listings', {
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
        axios.get(API_URL + 'listings/' + { id }, 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getSellerListings() {
        axios.get(API_URL + 'listings/me', 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    updateUserData(id, location) {
        axios.patch(API_URL + 'users/' + id, {
            location
        }, {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getMyUserData() {
        axios.get(API_URL + 'users/me', 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getUserData(id) {
        axios.get(API_URL + 'users/' + id, 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getUserSearchHistory(id) {
        axios.get(API_URL + 'users/' + { id } + '/searches', 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    search(query) {
        axios.get(API_URL + 'search?query=' + { query }, 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getReviews(id) {
        axios.get(API_URL + 'review/' + { id }, 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getRatings(id) {
        axios.get(API_URL + 'rating/' + { id }, 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    createReview(id, reviewContent) {
        axios.post(API_URL + 'review/' + { id }, {
            reviewContent
        }, {withCredentials: true})
        .catch(httpErrorHandler);
    }

    createRating(id, ratingValue) {
        axios.post(API_URL + 'rating/' + { id }, {
            ratingValue
        }, {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getRecommendations() {
        axios.get(API_URL + 'recommendations', 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    ignoreRecommendation(id) {
        axios.post(API_URL + 'recommendations/' + { id } + '/ignore', {
            ignore: true
        }, {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getChats(id) {
        axios.get(API_URL + 'chats', {
            id
        }, {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getChatMessages(id) {
        axios.get(API_URL + 'messages/' + { id }, {
            id
        }, {withCredentials: true})
        .catch(httpErrorHandler);
    }

    getChatInformation(id) {
        axios.get(API_URL + 'chats/' + { id }, {
            id
        }, {withCredentials: true})
        .catch(httpErrorHandler);

    }

    sendMessage(message) {
        axios.post(API_URL + 'messages/updates', {
            message
        }, {withCredentials: true})
        .catch(httpErrorHandler);
    }
}

export default DataService;