// services/post.js
import API from "./axios";

export const createPost = (formData) => API.post("/posts", formData);
export const getAllPosts = () => API.get("/posts");
export const getPostById = (id) => API.get(`/posts/${id}`);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);
