import axios from "axios";
import httpErrorHandler from "./httpErrorHandler";

const API_URL = "http://localhost:8080/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "login", {
                username,
                password
            }, { withCredentials: true })
            .catch(httpErrorHandler);
    }
  
    logout() {
        // TODO: Remove from cookies or local storage
        localStorage.removeItem("user");
    }

    register(email) {
        return axios.post(API_URL + "request_account", {
            email,
            callback: "http://localhost:3000/verify-account?jwt="
        })
        .catch(httpErrorHandler);
    }

    verify(jwt, username, password, location) {
        return axios.post(API_URL + "verify_account", {
            jwt,
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

    updateLocation(userId, newLocation) {
        return axios.post(API_URL + "update_location", {
            userId,
            newLocation
        })
        .catch(httpErrorHandler);
    }
}

export default AuthService;
