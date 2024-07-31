import axios from "axios";
import httpErrorHandler from "./httpErrorHandler";

class AuthService {
    /*
    * Account Management: Login Endpoint
    * Success (200): returns message, sets authorization cookie
    * Error: returns message
    */
    async login(username, password) {
        try {
            return await axios
            .post(process.env.REACT_APP_BACK_API + "login", {
                username,
                password
            }, {withCredentials: true});
        } catch (error) {
            httpErrorHandler(error)
            return error.response;
        }
    }
  
    /*
    * Logout
    * Removes authorization cookie
    */
    async logout() {
        try {
            return await axios.get(process.env.REACT_APP_BACK_API + 'logout', { withCredentials: true });
        } catch (error) {
            httpErrorHandler(error)
            return error.response;
        }
    }

    /*
    * Account Management: Request Account Endpoint
    * Success (200): returns message, sends an email
    * Error: returns message
    */
    async register(email) {
        try {
            return await axios.post(process.env.REACT_APP_BACK_API + "request_account", {
                email,
                callback: process.env.REACT_APP_FRONT_URL + "verify-account/"
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
            return await axios.post(process.env.REACT_APP_BACK_API + "verify_account", {
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
            return await axios.post(process.env.REACT_APP_BACK_API + "request_reset", {
                email,
                callback: process.env.REACT_APP_FRONT_URL + "password-update/"
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
            return await axios.post(process.env.REACT_APP_BACK_API + "verify_reset", {
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