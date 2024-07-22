import axios from "axios";
import httpErrorHandler from "./httpErrorHandler";

const API_URL = "http://localhost:8080/";

class AuthService {
    /*
    * Account Management: Login Endpoint
    * Success (200): returns message, sets authorization cookie
    * Error: returns message
    */
    login(username, password) {
        const response = axios
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
    logout() {
        // TODO remove from cookies
        localStorage.removeItem("user");
    }

    /*
    * Account Management: Request Account Endpoint
    * Success (200): returns message, sends an email
    * Error: returns message
    */
    register(email) {
        return axios.post(API_URL + "request_account", {
            email,
            callback: "http://localhost:3000/verify-account?jwt="
        })
        .catch(httpErrorHandler);
    }

    /*
    * Account Management: Verify/Create Account Endpoint
    * Success (201): returns userId, sets authorization cookie
    * Error: returns message
    */
    verify(jwt, username, password, location) {
        return axios.post(API_URL + "verify_account", {
            jwt,
            username,
            password,
            location
        })
        .catch(httpErrorHandler);
    }

    /*
    * Account Management: Request Password Reset Endpoint
    * Success (200): returns nothing, sends an email
    * Error: returns message
    */
    requestPasswordChange(email) {
        return axios.post(API_URL + "verify_password", {
            email
        })
        .catch(httpErrorHandler);
    }

    /*
    * Account Management: Verify/Reset Password Endpoint
    * Success (200): returns nothing
    * Error: returns message
    */
    completePasswordChange(password) {
        return axios.post(API_URL + "reset_password", {
            password
        })
        .catch(httpErrorHandler);
    }
}

export default AuthService;