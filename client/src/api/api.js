import axios from "axios";
import { API_ENDPOINTS } from "../utils/constants";

// setting api base url based on node environment
export const API_BASE_URL = process.env.NODE_ENV === 'development' ?
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
export const uploadnew = (formData) => API.post(`${API_ENDPOINTS.uploadVideo}`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

export const getVideos = () => API.get(`${API_ENDPOINTS.getVideos}`)