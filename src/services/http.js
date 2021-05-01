import axios from 'axios'
import auth from './auth'

const BASE_URL = process.env.REACT_APP_API
const TIMEOUT = 5 * 60 * 1000

const http = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.getToken()}`
    },
})

export default http