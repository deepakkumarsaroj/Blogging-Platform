// services/auth.js
import API from "./axios";

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
export const logout = () => API.post("/auth/logout");
export const getProfile = (username) => API.get(`/auth/profile/${username}`);
