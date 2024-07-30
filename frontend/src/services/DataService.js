import axios from 'axios';
import httpErrorHandler from './httpErrorHandler';

const API_URL = 'http://localhost:8080/';

class DataService {
    /*
    * Listings: Create Listing Endpoint
    * Success (201): returns limited listing object
    *   (listingId, title, price, location, status)
    * Error: returns message
    */
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

    /*
    * Listings: Update Listing Endpoint
    * Success (200): returns nothing
    * Error: returns message
    */
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

    /*
    * Listings: Delete Listing Endpoint
    * Success (200): returns nothing
    * Error: returns message
    */
    async deleteListing(id) {
        try {
            return await axios.delete(API_URL + 'listings/' + id,
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Listings: Get Sorted Listings Endpoint
    * Success (200): returns list of listing objects
    * Error: returns message
    */
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

    /*
    * Listings: Get Listing Endpoint
    * Success (200): returns listing object
    * Error: returns message
    */
    async getListing(id) {
        try {
            return await axios.get(API_URL + 'listings/' + id,
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Listings: Get Current User's Listings Endpoint
    * Success (200): returns list of listing objects
    * Error: returns message
    */
    async getSellerListings() {
        try {
            return await axios.get(API_URL + 'listings/me',
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Users: Update User Data Endpoint
    * Success (200): returns nothing
    * Error: returns message
    */
    async updateUserData(location) {
        try {
            return await axios.patch(API_URL + 'users/me', {
                location
            }, { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Users: Get Current User's Data Endpoint
    * Success (200): returns limited user object
    *   (userId, username, location, joiningDate, itemsSold, itemsPurchased)
    * Error: returns message
    */
    async getMyUserData() {
        try {
            return await axios.get(API_URL + 'users/me',
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Users: Get User Data Endpoint
    * Success (200): returns limited user object
    *   (username, location, joiningDate, itemsSold, itemsPurchased)
    * Error: returns message
    */
    async getUserData(id) {
        try {
            return await axios.get(API_URL + 'users/' + id,
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Users: Get Current User's Search History Endpoint
    * Success (200): returns list of search queries
    * Error: returns message
    */
    async getUserSearchHistory() {
        try {
            return await axios.get(API_URL + 'users/me/searches',
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Search: Search Endpoint
    * Success (200): returns list of listing objects
    * Error: returns message
    */
    async search(query) {
        try{
         return  await axios.get(API_URL + 'search?query=' + query , 
            {withCredentials: true})
        } catch (error){
            return httpErrorHandler(error);
        }
    }

    /*
    * Reviews/Ratings: Get Reviews for Listing Endpoint
    * Success (200): returns list limited review objects
    *   (review, username, createdOn)
    * Error: returns message
    */
    async getReviews(listingId) {
        try {
            return await axios.get(API_URL + 'review/' + listingId,
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Reviews/Ratings: Get Ratings for Listing Endpoint
    * Success (200): returns list limited rating objects
    *   (rating, username, createdOn)
    * Error: returns message
    */
    async getRatings(listingId) {
        try {
            return await axios.get(API_URL + 'rating/' + listingId,
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Reviews/Ratings: Create Review Endpoint
    * Success (201): returns limited review data
    *   (listingReviewId, reviewedListingId (same as listingId), timestamp)
    * Error: returns message
    */
    async createReview(listingId, reviewContent) {
        try {
            return await axios.post(API_URL + 'review/' + listingId, {
                reviewContent
            }, { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Reviews/Ratings: Create Rating Endpoint
    * Success (201): returns limited rating data
    *   (ratingId, timestamp)
    * Error: returns message
    */
    async createRating(listingId, ratingValue) {
        try {
            return await axios.post(API_URL + 'rating/' + listingId, {
                ratingValue
            }, { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Recommendations: Get Recommendations for Current User Endpoint
    * Success (200): returns list of listingId's
    * Error: returns message
    */
    async getRecommendations() {
        try {
            return await axios.get(API_URL + 'recommendations',
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Recommendations: Ignore Recommendation Endpoint
    * Success (200): returns nothing
    * Error: returns message
    */
    async ignoreRecommendation(listingId) {
        try {
            return await axios.post(API_URL + 'recommendations/' + listingId + '/ignore', {
                ignore: true
            }, { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Messages: Get Chats for Current User Endpoint
    * Success (200): returns list of chatIds
    * Error: returns message
    */
    async getChats() {
        try {
            return await axios.get(API_URL + 'messages/chats', 
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Messages: Create Chat Endpoint
    * Success (200): returns chatId 
    *   (chatId is for chat between current user and seller of the passed listingId)
    * Error: returns message
    */
    async createChat(listingId) {
        try {
            return await axios.post(API_URL + 'chats/',{listingId}, 
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Messages: Get Chat's Messages Endpoint
    * Success (200): returns list of messages
    *   (messages include messageId, senderId, content, timestamp)
    * Error: returns message
    */
    async getChatMessages(chatId) {
        try {
            return await axios.get(API_URL + 'messages/' + chatId, 
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Messages: Get Chat Information Endpoint
    * Success (200): returns list of userIds, a listingId, and lastMessageTime
    * Error: returns message
    */
    async getChatInformation(chatId) {
        try {
            return await axios.get(API_URL + 'chats/' + chatId,
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }

    }

    /*
    * Messages: Send Message Endpoint
    * Success (200): returns nothing
    * Error: returns message
    */
    async sendMessage(chatId, content) {
        try {
            return await axios.post(API_URL + 'messages/' + chatId, {
                content
            }, { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Charity: Create Charity Endpoint
    * Success (200): returns charity object
    *   (start_date, charity_id, name, status, fund, logo_url, end_date, num_listings)
    * Error: returns message
    */
    async createCharity(name, logo_url, end_date) {
        try {
            return await axios.post(API_URL + 'charity', {
                name, 
                status: "OPEN",
                fund: 0,
                logo_url, 
                end_date,
                num_listings: 0
            }, { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Charity: Get All Charities Endpoint
    * Success (200): returns list of charity objects
    *   (name, status, logoUrl, fund, endDate, numListing)
    *   (status can be "OPEN" or "CLOSED")
    * Error: returns message
    */
    async getCharities() {
        try {
            return await axios.get(API_URL + 'charity', 
                { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }
}

export default DataService;