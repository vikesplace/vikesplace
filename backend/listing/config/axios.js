import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: process.env.DATA_LAYER,
    timeout: 1000,
  });

export default axiosInstance;