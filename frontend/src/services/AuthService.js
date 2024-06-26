import axios from "axios";
import httpErrorHandler from "./httpErrorHandler";

const API_URL = "http://localhost:8080/";

class AuthService {
    login(username, password) {
        const response = axios
            .post(API_URL + "login", {
                username,
                password
            }, {withCredentials: true})
            .catch(httpErrorHandler);
        return response;
    }
  
    logout() {
        localStorage.removeItem("user");
    }

    register(email) {
        return axios.post(API_URL + "request_account", {
            email
        })
        .catch(httpErrorHandler);
    }

    verify(username, password, location) {
        return axios.post(API_URL + "verify_account", {
            username,
            password,
            location
        })
        .catch(httpErrorHandler);
    }

    requestPasswordChange(email) {
        return axios.post(API_URL + "verify_password", {
            email
        })
        .catch(httpErrorHandler);
    }

    completePasswordChange(password) {
        return axios.post(API_URL + "reset_password", {
            password
        })
        .catch(httpErrorHandler);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getCurrentUserId() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default AuthService;