import axios from 'axios';
import authHeader from './AuthHeaderHelper';
import httpErrorHandler from './httpErrorHandler';

const API_URL = 'http://localhost:8080/';

class DataService {
    createListing(title, price, location, status, category) {
        axios.post(API_URL + 'listings', {
            headers: authHeader(),
            title,
            price,
            location,
            status,
            category
        })
        .catch(httpErrorHandler);
    }

    updateListing(id, title, price, location, status, buyerUsername, category) {
        axios.patch(API_URL + 'listings/' + { id }, {
            headers: authHeader(),
            title,
            price,
            location,
            status,
            buyerUsername,
            category
        })
        .catch(httpErrorHandler);
    }

    deleteListing(id) {
        axios.delete(API_URL + 'listings/' + { id }, {
            headers: authHeader()
        })
        .catch(httpErrorHandler);
    }

    getSortedListings(minPrice, maxPrice, status, sortBy, isDescending, pullLimit, pageLimit) {
        axios.get(API_URL + 'listings', {
            headers: authHeader(),
            minPrice,
            maxPrice,
            status,
            sortBy,
            isDescending,
            // pullLimit,
            // pageLimit
        })
        .catch(httpErrorHandler);
    }

    getListing(id) {
        axios.get(API_URL + 'listings/' + { id }, {
            headers: authHeader()
        })
        .catch(httpErrorHandler);
    }

    getSellerListings() {
        axios.get(API_URL + 'listings/me', {
            headers: authHeader()
        })
        .catch(httpErrorHandler);
    }

    updateUserData(id, location) {
        axios.patch(API_URL + 'users/' + id, {
            headers: authHeader(),
            location
        })
        .catch(httpErrorHandler);
    }

    getMyUserData() {
        axios.get(API_URL + 'users/me', {
            headers: authHeader()
        })
        .catch(httpErrorHandler);
    }

    getUserData(id) {
        axios.get(API_URL + 'users/' + id, {
            headers: authHeader()
        })
        .catch(httpErrorHandler);
    }

    getUserSearchHistory(id) {
        axios.get(API_URL + 'users/' + { id } + '/searches', {
            headers: authHeader()
        })
        .catch(httpErrorHandler);
    }

    search(query) {
        axios.get(API_URL + 'search?query=' + { query }, {
            headers: authHeader(),
            query
        })
        .catch(httpErrorHandler);
    }

    getReviews(id) {
        axios.get(API_URL + 'review/' + { id }, {
            headers: authHeader()
        })
        .catch(httpErrorHandler);
    }

    getRatings(id) {
        axios.get(API_URL + 'rating/' + { id }, {
            headers: authHeader()
        })
        .catch(httpErrorHandler);
    }

    createReview(id, reviewContent) {
        axios.post(API_URL + 'review/' + { id }, {
            headers: authHeader(),
            reviewContent
        })
        .catch(httpErrorHandler);
    }

    createRating(id, ratingValue) {
        axios.post(API_URL + 'rating/' + { id }, {
            headers: authHeader(),
            ratingValue
        })
        .catch(httpErrorHandler);
    }

    getRecommendations() {
        axios.get(API_URL + 'recommendations', {
            headers: authHeader()
        })
        .catch(httpErrorHandler);
    }

    ignoreRecommendation(id) {
        axios.post(API_URL + 'recommendations/' + { id } + '/ignore', {
            headers: authHeader(),
            ignore: true
        })
        .catch(httpErrorHandler);
    }

    getChats(id) {
        axios.get(API_URL + 'chats', {
            headers: authHeader(),
            id
        })
        .catch(httpErrorHandler);
    }

    getChatMessages(id) {
        axios.get(API_URL + 'messages/' + { id }, {
            headers: authHeader(),
            id
        })
        .catch(httpErrorHandler);
    }

    getChatInformation(id) {
        axios.get(API_URL + 'chats/' + { id }, {
            headers: authHeader(),
            id
        })
        .catch(httpErrorHandler);

    }

    sendMessage(message) {
        axios.post(API_URL + 'messages/updates', {
            headers: authHeader(),
            message
        })
        .catch(httpErrorHandler);
    }
}

export default DataService;