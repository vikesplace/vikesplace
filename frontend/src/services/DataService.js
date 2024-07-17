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
                status: "AVAILABLE",
                category,
                forCharity
            }, { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async updateListing(id, title, price, location, status, buyerUsername, forCharity) {
        try {
            return await axios.patch(API_URL + 'listings/' + id, {
                title,
                price,
                location,
                status,
                buyerUsername,
                // optional: category
                forCharity
            }, { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async deleteListing(id) {
        try {
            return await axios.delete(API_URL + 'listings/' + id,
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async getSortedListings(minPrice, maxPrice, status, sortBy, isDescending, pullLimit, pageOffset) {
        let searchParam = new URLSearchParams();
        if (pullLimit && pullLimit !== "")
            searchParam.append("pullLimit", pullLimit);
        if (pageOffset && pageOffset !== "")
            searchParam.append("pageOffset", pageOffset);
        if (minPrice && minPrice !== "")
            searchParam.append("minPrice", minPrice);
        if (maxPrice && maxPrice !== "")
            searchParam.append("maxPrice", maxPrice);
        if (status && status !== "")
            searchParam.append("status", status);
        if (sortBy && sortBy !== "")
            searchParam.append("sortBy", sortBy);
        if (isDescending !== undefined && isDescending !== null)
            searchParam.append("isDescending", isDescending);

        try {
            return await axios.get(API_URL + 'listings?' + searchParam.toString(),
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async getListing(id) {
        try {
            return await axios.get(API_URL + 'listings/' + id,
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async getSellerListings() {
        try {
            return await axios.get(API_URL + 'listings/me',
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async updateUserData(location) {
        try {
            return await axios.patch(API_URL + 'users/me', {
                location
            }, { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async getMyUserData() {
        try {
            return await axios.get(API_URL + 'users/me',
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async getUserData(id) {
        try {
            return await axios.get(API_URL + 'users/' + id,
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async getUserSearchHistory() {
        try {
            return await axios.get(API_URL + 'users/me' + '/searches',
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    search(query) {
        return axios.get(API_URL + 'search?query=' + { query }, 
            {withCredentials: true})
        .catch(httpErrorHandler);
    }

    async getReviews(id) {
        try {
            return await axios.get(API_URL + 'review/' + id,
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async getRatings(id) {
        try {
            return await axios.get(API_URL + 'rating/' + id,
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async createReview(id, reviewContent) {
        try {
            return await axios.post(API_URL + 'review/' + id, {
                reviewContent
            }, { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async createRating(id, ratingValue) {
        try {
            return await axios.post(API_URL + 'rating/' + id, {
                ratingValue
            }, { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async getRecommendations() {
        try {
            return await axios.get(API_URL + 'recommendations',
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async ignoreRecommendation(id) {
        try {
            return await axios.post(API_URL + 'recommendations/' + id + '/ignore', {
                ignore: true
            }, { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async getChats(id) {
        try {
            return await axios.get(API_URL + 'chats', {
                id
            }, { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async createNewChat(id) {
        try {
            return await axios.post(API_URL + 'chats/' + id, 
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async getChatMessages(id) {
        try {
            return await axios.get(API_URL + 'messages/' + id, {
                id
            }, { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async getChatInformation(id) {
        try {
            return await axios.get(API_URL + 'chats/' + id,
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }

    }

    async sendMessage(id, content) {
        try {
            return await axios.post(API_URL + 'messages/' + id, {
                content
            }, { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }
}

export default DataService;