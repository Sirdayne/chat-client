import axios from 'axios'
import auth from './auth'

const BASE_URL = process.env.REACT_APP_API
const TIMEOUT = 5 * 60 * 1000

const http = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
})

http.interceptors.request.use(function (config) {
    if (auth.getToken) {
        config.headers['Authorization'] = `Bearer ${auth.getToken()}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default http