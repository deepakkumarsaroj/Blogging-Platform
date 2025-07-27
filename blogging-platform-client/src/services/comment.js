// services/comment.js
import API from "./axios";

export const addComment = (postId, data) =>
  API.post(`/posts/${postId}/comments`, data);

export const getComments = (postId) => API.get(`/posts/${postId}/comments`);
