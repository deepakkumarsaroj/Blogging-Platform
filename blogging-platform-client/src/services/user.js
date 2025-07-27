// services/user.js
import API from "./axios";

export const getAllUsers = () => API.get("/users");
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const promoteUser = (id) => API.patch(`/users/${id}/promote`);
