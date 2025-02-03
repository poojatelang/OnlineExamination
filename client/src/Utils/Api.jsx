import axios from "axios";

// Base API URL
const API_URL = "http://localhost:3500/api/"; // Change this according to your backend URL

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Authorization token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Auth APIs
// export const loginUser = (credentials) => api.post("/auth/login", credentials);
// export const registerUser = (studentData) => api.post("/auth/register", studentData);
// export const fetchStudentProfile = () => api.get("/student/profile");
// export const updateStudentProfile = (studentData) => api.put("/student/update", studentData);

export default api;
