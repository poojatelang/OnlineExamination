import axios from "axios";

// Base API URL
const API_URL = "https://onlineexamination-daml.onrender.com/api/";

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
