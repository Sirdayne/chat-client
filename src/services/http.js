import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API
const TIMEOUT = 5 * 60 * 1000

let http = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default http