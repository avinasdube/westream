import axios from "axios";

// setting api base url based on node environment
const API_BASE_URL = process.env.NODE_ENV === 'development' ?
    process.env.REACT_APP_LOCAL_URL :
    process.env.REACT_APP_DEPLOYED_URL

// creating an axios instance to send customized api request
const API = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

// exporting custom functions to send api request
export const sayHi = () => API.get()