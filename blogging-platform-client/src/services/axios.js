// services/axios.js
import axios from "axios";
import jwtDecode from "jwt-decode";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // 🔁 Change this to your backend URL
  withCredentials: true,
});

// Attach token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
