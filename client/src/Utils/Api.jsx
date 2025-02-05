import axios from "axios";

// Base API URL
const API_URL = "http://localhost:3500/api/";

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
