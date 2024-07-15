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

    getSortedListings(minPrice, maxPrice, status, sortBy, isDescending, pullLimit, pageOffset) {
        let paramString = "";
        if (pullLimit) {
            paramString += "pullLimit=" + pullLimit;

        }
        if (pageOffset) {
            paramString += "pageOffset=" + pageOffset;
        } 
        if (minPrice) {
            paramString += (paramString ? "&" : "") + "minPrice=" + minPrice;
        }         
        if (maxPrice) {
            paramString += (paramString ? "&" : "") + "maxPrice=" + maxPrice;
        }
        if (status) {
            paramString += (paramString ? "&" : "") + "status=" + status;
        }  
        if (sortBy) {
            paramString += (paramString ? "&" : "") + "sortBy=" + sortBy;
        } 
        if (isDescending) {
            paramString += (paramString ? "&" : "") + "isDescending=" + isDescending;
        }

        return axios.get(API_URL + 'listings?' + paramString, 
            {withCredentials: true})
        .catch(httpErrorHandler);
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