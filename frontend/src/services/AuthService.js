import axios from "axios";
import httpErrorHandler from "./httpErrorHandler";

const API_URL = "http://localhost:8080/";

class AuthService {
    async login(username, password) {
        const response = axios
            .post(API_URL + "login", {
                username,
                password
            }, {withCredentials: true})
            .catch(httpErrorHandler);
        return await response;
    }
  
    logout() {
        // TODO remove from cookies
        localStorage.removeItem("user");
    }

    async register(email) {
        try {
            return await axios.post(API_URL + "request_account", {
                email,
                callback: "http://localhost:3000/verify-account?jwt="
            });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async verify(jwt, username, password, location) {
        try {
            return await axios.post(API_URL + "verify_account", {
                jwt,
                username,
                password,
                location
            });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async requestPasswordChange(email) {
        try {
            return await axios.post(API_URL + "request_reset", {
                email
            });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }

    async completePasswordChange(jwt, password) {
        try {
            return await axios.post(API_URL + "verify_reset", {
                jwt, 
                password
            });
        } catch (error) {
            return httpErrorHandler(error);
        }
    }
}

export default AuthService;