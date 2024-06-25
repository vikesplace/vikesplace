import axios from 'axios';
export default axios.defaults.baseURL = process.env.DATA_LAYER;