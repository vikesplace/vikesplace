import axios from "axios"

export default function httpErrorHandler(error) {
    if (error === null) throw new Error('Error is null!')
    if (axios.isAxiosError(error)) {
        const response = error?.response
        const request = error?.request
        // optional: const config = error?.config for access to config for api call (can retry)

        if (response) {
            // server responded with a status code outside of success (2xx)
            const statusCode = response?.status
            if (statusCode === 400) {
                console.log('Bad request, please try again');
            } else if (statusCode === 401) {
                console.log('Please login to access this resource');
                window.location.replace('/login');
            } else if (statusCode === 403) {
                console.log('You do not have access to this resource');
                window.location.replace('/login');
            } else if (statusCode === 404) {
                console.log('Requested resource does not exist or has been deleted');                
            } else if (statusCode === 500) {
                console.log('Unexpected internal server error');
            } else {
                console.log('Error ' + statusCode + ', please try again')
            }
        } else if (request) {
            // no response was received
            console.log('No response was received, please try again');
        }
    }
}
