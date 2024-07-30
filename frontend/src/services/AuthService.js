import axios from "axios";
import httpErrorHandler from "./httpErrorHandler";

const API_URL = "http://localhost:8080/";
const FRONT_URL = "http://localhost:3000/";

class AuthService {
    /*
    * Account Management: Login Endpoint
    * Success (200): returns message, sets authorization cookie
    * Error: returns message
    */
    async login(username, password) {
        const response = await axios
            .post(API_URL + "login", {
                username,
                password
            }, {withCredentials: true})
            .catch(httpErrorHandler);
        return response;
    }
  
    /*
    * Logout
    * Removes authorization cookie
    */
    async logout() {
        try {
            return await axios.get(API_URL + 'logout', { withCredentials: true });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    /*
    * Account Management: Request Account Endpoint
    * Success (200): returns message, sends an email
    * Error: returns message
    */
    async register(email) {
        try {
            return await axios.post(API_URL + "request_account", {
                email,
                callback: FRONT_URL + "verify-account/"
            });
        } catch (error) {
            httpErrorHandler(error);
            return error.response;
        }
    }

    /*
    * Account Management: Verify/Create Account Endpoint
    * Success (201): returns userId, sets authorization cookie
    * Error: returns message
    */
    async verify(jwt, username, password, location) {
        try {
            return await axios.post(API_URL + "verify_account", {
                jwt,
                username,
                password,
                location
            });
        } catch (error) {
            httpErrorHandler(error);
            return error.response;
        }
    }

    /*
    * Account Management: Request Password Reset Endpoint
    * Success (200): returns nothing, sends an email
    * Error: returns message
    */
    async requestPasswordChange(email) {
        try {
            return await axios.post(API_URL + "request_reset", {
                email,
                callback: FRONT_URL + "password-update/"
            });
        } catch (error) {
            httpErrorHandler(error);
            return error.response;
        }
    }

    /*
    * Account Management: Verify/Reset Password Endpoint
    * Success (200): returns nothing
    * Error: returns message
    */
    async completePasswordChange(jwt, password) {
        try {
            return await axios.post(API_URL + "verify_reset", {
                jwt, 
                password
            });
        } catch (error) {
            httpErrorHandler(error);
            return error.response;
        }
    }
}

export default AuthService;