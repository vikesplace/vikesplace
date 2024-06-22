import axios from 'axios';
export default axios.defaults.baseURL = process.env.ALG_ENDPOINT;